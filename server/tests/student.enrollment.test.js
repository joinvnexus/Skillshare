import request from "supertest";

import app from "../src/app.js";
import { prisma } from "../src/lib/prisma.js";
import { signAccessToken } from "../src/lib/tokens.js";

const baseUrl = "/api/v1";

describe("Student enrollments", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rejects direct enrollment for paid courses without a paid order", async () => {
    prisma.course.findFirst.mockResolvedValue({
      id: "course-1",
      slug: "course-1",
      title: "Course One",
      price: 49,
      salePrice: null,
      status: "PUBLISHED"
    });
    prisma.enrollment.findUnique.mockResolvedValue(null);
    prisma.order.findFirst.mockResolvedValue(null);

    const token = signAccessToken({
      userId: "student-1",
      role: "STUDENT",
      email: "student@example.com"
    });

    const response = await request(app)
      .post(`${baseUrl}/student/me/enrollments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: "course-1" });

    expect(response.status).toBe(403);
  });

  it("allows free course enrollment without prior payment", async () => {
    prisma.course.findFirst.mockResolvedValue({
      id: "course-free",
      slug: "course-free",
      title: "Free Course",
      price: 0,
      salePrice: null,
      status: "PUBLISHED"
    });
    prisma.enrollment.findUnique.mockResolvedValue(null);
    prisma.enrollment.create.mockResolvedValue({
      id: "enroll-1",
      courseId: "course-free",
      userId: "student-1"
    });
    prisma.course.update.mockResolvedValue({ id: "course-free" });
    prisma.notification.create.mockResolvedValue({ id: "notif-1" });

    const token = signAccessToken({
      userId: "student-1",
      role: "STUDENT",
      email: "student@example.com"
    });

    const response = await request(app)
      .post(`${baseUrl}/student/me/enrollments`)
      .set("Authorization", `Bearer ${token}`)
      .send({ courseId: "course-free" });

    expect(response.status).toBe(201);
    expect(prisma.enrollment.create).toHaveBeenCalled();
  });
});
