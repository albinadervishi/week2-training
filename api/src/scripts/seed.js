require("dotenv").config();
const mongoose = require("mongoose");
const crypto = require("crypto");
const { MONGODB_ENDPOINT } = require("../config");

const UserObject = require("../models/user");
const AdminObject = require("../models/admin");
const EventObject = require("../models/event");
const AttendeeObject = require("../models/attendee");

async function seed() {
  try {
    console.log("🌱 Starting database seed...");

    // Connect to MongoDB
    await mongoose.connect(MONGODB_ENDPOINT);
    console.log("✅ Connected to MongoDB");

    // Clear existing data
    await UserObject.deleteMany({});
    await AdminObject.deleteMany({});
    await EventObject.deleteMany({});
    await AttendeeObject.deleteMany({});
    console.log("🗑️  Cleared existing data");

    // Create test users
    const users = await UserObject.create([
      {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "user",
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        role: "user",
      },
      {
        name: "Bob Johnson",
        email: "bob@example.com",
        password: "password123",
        role: "user",
      },
    ]);
    console.log(`✅ Created ${users.length} users`);

    // Create admin
    const admin = await AdminObject.create({
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    });
    console.log("✅ Created admin user");

    // Create sample events (keep existing events code)
    const events = await EventObject.create([
      {
        title: "Tech Conference 2026",
        description: "Annual technology conference featuring the latest innovations in AI, Web3, and Cloud Computing.",
        start_date: new Date("2026-03-15T09:00:00"),
        end_date: new Date("2026-03-15T18:00:00"),
        venue: "Convention Center",
        address: "123 Main Street",
        city: "Paris",
        country: "France",
        capacity: 500,
        available_spots: 500,
        price: 0,
        currency: "EUR",
        status: "published",
        category: "conference",
        organizer_id: users[0]._id,
        organizer_name: users[0].name,
        organizer_email: users[0].email,
        registration_deadline: new Date("2026-03-10T23:59:59"),
      },
      {
        title: "JavaScript Workshop",
        description: "Hands-on workshop covering modern JavaScript frameworks including React, Vue, and Next.js.",
        start_date: new Date("2026-02-20T14:00:00"),
        end_date: new Date("2026-02-20T17:00:00"),
        venue: "Tech Hub",
        address: "456 Innovation Ave",
        city: "Lyon",
        country: "France",
        capacity: 30,
        available_spots: 30,
        price: 49.99,
        currency: "EUR",
        status: "published",
        category: "workshop",
        organizer_id: users[1]._id,
        organizer_name: users[1].name,
        organizer_email: users[1].email,
        requires_approval: false,
      },
      {
        title: "Startup Networking Night",
        description:
          "Meet fellow entrepreneurs, investors, and startup enthusiasts in a casual networking environment.",
        start_date: new Date("2026-02-01T19:00:00"),
        end_date: new Date("2026-02-01T22:00:00"),
        venue: "Tech Hub Lyon",
        address: "789 Startup Lane",
        city: "Lyon",
        country: "France",
        capacity: 100,
        available_spots: 100,
        price: 0,
        currency: "EUR",
        status: "published",
        category: "networking",
        organizer_id: users[0]._id,
        organizer_name: users[0].name,
        organizer_email: users[0].email,
      },
      {
        title: "AI & Machine Learning Seminar",
        description: "Expert-led seminar on the latest developments in artificial intelligence and machine learning.",
        start_date: new Date("2026-04-10T10:00:00"),
        end_date: new Date("2026-04-10T16:00:00"),
        venue: "University Auditorium",
        address: "321 Academic Way",
        city: "Toulouse",
        country: "France",
        capacity: 200,
        available_spots: 200,
        price: 29.99,
        currency: "EUR",
        status: "published",
        category: "seminar",
        organizer_id: users[2]._id,
        organizer_name: users[2].name,
        organizer_email: users[2].email,
        registration_deadline: new Date("2026-04-05T23:59:59"),
      },
      {
        title: "Draft Event - Not Published",
        description: "This event is still in draft mode and won't appear in public listings.",
        start_date: new Date("2026-05-01T10:00:00"),
        venue: "TBD",
        city: "Paris",
        country: "France",
        capacity: 50,
        available_spots: 50,
        price: 0,
        currency: "EUR",
        status: "draft",
        category: "other",
        organizer_id: users[1]._id,
        organizer_name: users[1].name,
        organizer_email: users[1].email,
      },
    ]);
    console.log(`✅ Created ${events.length} events`);

    // Create sample attendees with STRING event_id and user_id + denormalized event data
    const attendees = [];

    // User 0 (John) registers for Event 1 (JavaScript Workshop)
    const ticket1 = `TKT-${events[1]._id.toString().slice(-6).toUpperCase()}-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;
    attendees.push({
      event_id: events[1]._id.toString(), // STRING
      user_id: users[0]._id.toString(), // STRING
      name: users[0].name,
      email: users[0].email,
      // Denormalized event data
      event_title: events[1].title,
      event_start_date: events[1].start_date,
      event_end_date: events[1].end_date,
      event_city: events[1].city,
      event_country: events[1].country,
      event_venue: events[1].venue,
      event_image_url: events[1].image_url || "",
      ticket_number: ticket1,
      status: "confirmed",
      payment_status: "pending",
      payment_amount: events[1].price,
    });

    // User 1 (Jane) registers for Event 0 (Tech Conference)
    const ticket2 = `TKT-${events[0]._id.toString().slice(-6).toUpperCase()}-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;
    attendees.push({
      event_id: events[0]._id.toString(),
      user_id: users[1]._id.toString(),
      name: users[1].name,
      email: users[1].email,
      event_title: events[0].title,
      event_start_date: events[0].start_date,
      event_end_date: events[0].end_date,
      event_city: events[0].city,
      event_country: events[0].country,
      event_venue: events[0].venue,
      event_image_url: events[0].image_url || "",
      ticket_number: ticket2,
      status: "confirmed",
      payment_status: "free",
      payment_amount: events[0].price,
    });

    // User 2 (Bob) registers for Event 2 (Startup Networking Night)
    const ticket3 = `TKT-${events[2]._id.toString().slice(-6).toUpperCase()}-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;
    attendees.push({
      event_id: events[2]._id.toString(),
      user_id: users[2]._id.toString(),
      name: users[2].name,
      email: users[2].email,
      event_title: events[2].title,
      event_start_date: events[2].start_date,
      event_end_date: events[2].end_date,
      event_city: events[2].city,
      event_country: events[2].country,
      event_venue: events[2].venue,
      event_image_url: events[2].image_url || "",
      ticket_number: ticket3,
      status: "confirmed",
      payment_status: "free",
      payment_amount: events[2].price,
    });

    // User 0 (John) also registers for Event 2 (Startup Networking Night)
    const ticket4 = `TKT-${events[2]._id.toString().slice(-6).toUpperCase()}-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;
    attendees.push({
      event_id: events[2]._id.toString(),
      user_id: users[0]._id.toString(),
      name: users[0].name,
      email: users[0].email,
      event_title: events[2].title,
      event_start_date: events[2].start_date,
      event_end_date: events[2].end_date,
      event_city: events[2].city,
      event_country: events[2].country,
      event_venue: events[2].venue,
      event_image_url: events[2].image_url || "",
      ticket_number: ticket4,
      status: "confirmed",
      payment_status: "free",
      payment_amount: events[2].price,
    });

    const createdAttendees = await AttendeeObject.create(attendees);
    console.log(`✅ Created ${createdAttendees.length} attendees`);

    // Update event available_spots
    await EventObject.updateOne({ _id: events[1]._id }, { $inc: { available_spots: -1 } });
    await EventObject.updateOne({ _id: events[0]._id }, { $inc: { available_spots: -1 } });
    await EventObject.updateOne(
      { _id: events[2]._id },
      { $inc: { available_spots: -2 } }, // Two registrations
    );

    console.log("\n🎉 Seed completed successfully!\n");
    console.log("📧 Test Credentials:");
    console.log("   User: john@example.com / password123");
    console.log("   User: jane@example.com / password123");
    console.log("   User: bob@example.com / password123");
    console.log("   Admin: admin@example.com / admin123\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  }
}

seed();
