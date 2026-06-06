require("dotenv").config();

const connectDatabase = require("../config/db");
const User = require("../models/User");
const Service = require("../models/Service");
const Project = require("../models/Project");
const Testimonial = require("../models/Testimonial");
const Blog = require("../models/Blog");
const CareerOpening = require("../models/CareerOpening");
const { services, projects, testimonials, blogs, openings } = require("./defaultContent");

const ensureDefaultAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || "admin@hosannaenterprises.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@123";

  const existingAdmin = await User.findOne({ email });
  if (existingAdmin) {
    return existingAdmin;
  }

  const admin = await User.create({
    name: "Hosanna Admin",
    email,
    password,
    role: "admin",
    phone: "+91 98765 43210",
  });

  console.log(`Default admin created: ${email}`);
  return admin;
};

const seedDatabase = async () => {
  await connectDatabase();
  await ensureDefaultAdmin();

  await Promise.all([
    Service.deleteMany({}),
    Project.deleteMany({}),
    Testimonial.deleteMany({}),
    Blog.deleteMany({}),
    CareerOpening.deleteMany({}),
  ]);

  await Promise.all([
    Service.insertMany(services),
    Project.insertMany(projects),
    Testimonial.insertMany(testimonials),
    Blog.insertMany(blogs),
    CareerOpening.insertMany(
      openings.map((opening, index) => ({
        title: opening.title,
        type: opening.type,
        location: opening.location,
        experience: opening.experience,
        description: opening.description,
        order: index,
        isActive: true,
      }))
    ),
  ]);

  console.log("Seed data inserted successfully");
  process.exit(0);
};

if (require.main === module) {
  seedDatabase().catch((error) => {
    console.error("Seeding failed", error);
    process.exit(1);
  });
}

module.exports = { ensureDefaultAdmin, seedDatabase };
