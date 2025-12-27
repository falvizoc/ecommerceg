/**
 * Prisma Seed Script
 *
 * Creates initial data for development and testing:
 * - Demo tenants (tienda-demo, proteccion-contra-incendios)
 * - Admin user for each tenant
 * - Super admin user
 * - Default pricing configurations
 *
 * Run with: npx prisma db seed
 */

import { PrismaClient, UserRole, MarginType, PriceField } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { hash } from "bcryptjs";
import pg from "pg";
import "dotenv/config";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Starting seed...\n");

  // ---------------------------------------------------------------------------
  // Super Admin (no tenant - can manage all)
  // ---------------------------------------------------------------------------
  console.log("Creating super admin...");
  const superAdminPassword = await hash("superadmin123", 12);

  // Check if super admin exists (using findFirst for null tenantId)
  let superAdmin = await prisma.user.findFirst({
    where: { email: "admin@ecommerce-g.com", tenantId: null },
  });

  if (!superAdmin) {
    superAdmin = await prisma.user.create({
      data: {
        email: "admin@ecommerce-g.com",
        password: superAdminPassword,
        name: "Super Admin",
        role: UserRole.SUPER_ADMIN,
        emailVerified: new Date(),
      },
    });
  }
  console.log(`  ✓ Super admin created: ${superAdmin.email}\n`);

  // ---------------------------------------------------------------------------
  // Tenant 1: Demo Store (General)
  // ---------------------------------------------------------------------------
  console.log("Creating tenant: tienda-demo...");
  const tenant1 = await prisma.tenant.upsert({
    where: { slug: "tienda-demo" },
    update: {},
    create: {
      name: "Tienda Demo",
      slug: "tienda-demo",
      legalName: "Tienda Demo S.A. de C.V.",
      rfc: "TDE010101ABC",
      settings: {
        theme: {
          primaryColor: "#3b82f6",
          secondaryColor: "#1e40af",
        },
        contact: {
          email: "contacto@tienda-demo.com",
          phone: "+52 55 1234 5678",
        },
      },
      isActive: true,
    },
  });
  console.log(`  ✓ Tenant created: ${tenant1.name} (${tenant1.slug})`);

  // Admin for Tenant 1
  const admin1Password = await hash("admin123", 12);
  const admin1 = await prisma.user.upsert({
    where: {
      email_tenantId: { email: "admin@tienda-demo.com", tenantId: tenant1.id },
    },
    update: {},
    create: {
      email: "admin@tienda-demo.com",
      password: admin1Password,
      name: "Admin Demo",
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      tenantId: tenant1.id,
    },
  });
  console.log(`  ✓ Admin created: ${admin1.email}`);

  // Pricing for Tenant 1
  const pricing1 = await prisma.tenantPricing.upsert({
    where: { tenantId: tenant1.id },
    update: {},
    create: {
      tenantId: tenant1.id,
      defaultMarginType: MarginType.PERCENTAGE,
      defaultMarginValue: 25,
      basePriceField: PriceField.PRECIO_ESPECIAL,
      useApiExchangeRate: true,
    },
  });
  console.log(`  ✓ Pricing configured: ${pricing1.defaultMarginValue}% margin\n`);

  // ---------------------------------------------------------------------------
  // Tenant 2: Fire Protection Store (Niche)
  // ---------------------------------------------------------------------------
  console.log("Creating tenant: proteccion-incendios...");
  const tenant2 = await prisma.tenant.upsert({
    where: { slug: "proteccion-incendios" },
    update: {},
    create: {
      name: "Proteccion Contra Incendios MX",
      slug: "proteccion-incendios",
      domain: "proteccionincendios.local",
      legalName: "Proteccion Contra Incendios MX S.A. de C.V.",
      rfc: "PCI010101XYZ",
      settings: {
        theme: {
          primaryColor: "#dc2626",
          secondaryColor: "#991b1b",
        },
        contact: {
          email: "ventas@proteccionincendios.mx",
          phone: "+52 55 9876 5432",
        },
        niche: "fire-protection",
        categories: ["extintores", "detectores", "sistemas-supresion"],
      },
      isActive: true,
    },
  });
  console.log(`  ✓ Tenant created: ${tenant2.name} (${tenant2.slug})`);

  // Admin for Tenant 2
  const admin2Password = await hash("admin123", 12);
  const admin2 = await prisma.user.upsert({
    where: {
      email_tenantId: {
        email: "admin@proteccionincendios.mx",
        tenantId: tenant2.id,
      },
    },
    update: {},
    create: {
      email: "admin@proteccionincendios.mx",
      password: admin2Password,
      name: "Admin Fire Protection",
      role: UserRole.ADMIN,
      emailVerified: new Date(),
      tenantId: tenant2.id,
    },
  });
  console.log(`  ✓ Admin created: ${admin2.email}`);

  // Pricing for Tenant 2 (higher margin for niche)
  const pricing2 = await prisma.tenantPricing.upsert({
    where: { tenantId: tenant2.id },
    update: {},
    create: {
      tenantId: tenant2.id,
      defaultMarginType: MarginType.PERCENTAGE,
      defaultMarginValue: 35,
      basePriceField: PriceField.PRECIO_ESPECIAL,
      useApiExchangeRate: true,
    },
  });
  console.log(`  ✓ Pricing configured: ${pricing2.defaultMarginValue}% margin\n`);

  // ---------------------------------------------------------------------------
  // Demo Customer for Tenant 1
  // ---------------------------------------------------------------------------
  console.log("Creating demo customer...");
  const customer = await prisma.customer.upsert({
    where: {
      tenantId_email: { tenantId: tenant1.id, email: "cliente@ejemplo.com" },
    },
    update: {},
    create: {
      tenantId: tenant1.id,
      email: "cliente@ejemplo.com",
      firstName: "Juan",
      lastName: "Perez",
      phone: "+52 55 1234 5678",
      rfc: "PEPJ800101XXX",
      razonSocial: "Juan Perez",
      usoCfdi: "G03",
      regimenFiscal: "612",
      codigoPostal: "06600",
    },
  });
  console.log(`  ✓ Customer created: ${customer.firstName} ${customer.lastName}`);

  // Address for demo customer
  // Check if address exists
  const existingAddress = await prisma.address.findFirst({
    where: { customerId: customer.id, isDefault: true },
  });

  if (!existingAddress) {
    const address = await prisma.address.create({
      data: {
        customerId: customer.id,
        type: "SHIPPING",
        firstName: "Juan",
        lastName: "Perez",
        street: "Av. Reforma",
        numExt: "222",
        numInt: "Piso 5",
        neighborhood: "Juarez",
        city: "Ciudad de Mexico",
        state: "CDMX",
        postalCode: "06600",
        country: "MX",
        phone: "+52 55 1234 5678",
        isDefault: true,
      },
    });
    console.log(`  ✓ Address created: ${address.street} ${address.numExt}\n`);
  } else {
    console.log(`  ✓ Address exists: ${existingAddress.street} ${existingAddress.numExt}\n`);
  }

  // ---------------------------------------------------------------------------
  // Summary
  // ---------------------------------------------------------------------------
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
  console.log("🌱 Seed completed successfully!\n");
  console.log("Created:");
  console.log("  - 1 Super Admin");
  console.log("  - 2 Tenants with pricing");
  console.log("  - 2 Tenant Admins");
  console.log("  - 1 Demo Customer with address\n");
  console.log("Test credentials:");
  console.log("  Super Admin:  admin@ecommerce-g.com / superadmin123");
  console.log("  Tenant 1:     admin@tienda-demo.com / admin123");
  console.log("  Tenant 2:     admin@proteccionincendios.mx / admin123");
  console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
