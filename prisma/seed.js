const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

// users list
const users = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'John Smith',
    email: 'johnsmith@example.com',
    password: '123456',
    role: 'admin',
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f23456789012',
    name: 'Sarah Johnson',
    email: 'sarahj@example.com',
    password: '123456',
    role: 'teacher',
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-345678901234',
    name: 'Mike Wilson',
    email: 'mikewilson@example.com',
    password: '123456',
    role: 'teacher',
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defg-456789012345',
    name: 'Emily Davis',
    email: 'emilydavis@example.com',
    password: '123456',
    role: 'student',
  },
  {
    id: 'e5f6a7b8-c9d0-1234-efgh-567890123456',
    name: 'David Brown',
    email: 'davidb@example.com',
    password: '123456',
    role: 'student',
  },
  {
    id: 'f6a7b8c9-d0e1-2345-fghi-678901234567',
    name: 'Lisa Taylor',
    email: 'lisat@example.com',
    password: '123456',
    role: 'student',
  },
  {
    id: 'a7b8c9d0-e1f2-3456-ghij-789012345678',
    name: 'Robert Chen',
    email: 'robertchen@example.com',
    password: '123456',
    role: 'admin',
  },
  {
    id: 'b8c9d0e1-f2g3-4567-hijk-890123456789',
    name: 'Amanda Wilson',
    email: 'amandaw@example.com',
    password: '123456',
    role: 'teacher',
  },
];

// classes list
const classes = [
  {
    id: '1a2b3c4d-5e6f-7890-abcd-ef1234567890',
    name: 'Mathematics',
    section: 'A',
  },
  {
    id: '2b3c4d5e-6f7a-8901-bcde-f23456789012',
    name: 'Mathematics',
    section: 'B',
  },
  {
    id: '3c4d5e6f-7a8b-9012-cdef-345678901234',
    name: 'Science',
    section: 'A',
  },
  {
    id: '4d5e6f7a-8b9c-0123-defg-456789012345',
    name: 'Science',
    section: 'B',
  },
  {
    id: '5e6f7a8b-9c0d-1234-efgh-567890123456',
    name: 'English Literature',
    section: 'A',
  },
  {
    id: '6f7a8b9c-0d1e-2345-fghi-678901234567',
    name: 'English Literature',
    section: 'B',
  },
  {
    id: '7a8b9c0d-1e2f-3456-ghij-789012345678',
    name: 'History',
    section: 'A',
  },
  {
    id: '8b9c0d1e-2f3g-4567-hijk-890123456789',
    name: 'History',
    section: 'B',
  },
  {
    id: '9c0d1e2f-3g4h-5678-ijkl-901234567890',
    name: 'Computer Science',
    section: 'A',
  },
  {
    id: '0d1e2f3g-4h5i-6789-jklm-012345678901',
    name: 'Computer Science',
    section: 'B',
  },
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567891',
    name: 'Physics',
    section: 'A',
  },
];

// students list
const students = [
  {
    id: 's1a2b3c4-d5e6-7890-abcd-ef1234567890',
    name: 'Emily Davis',
    age: 16,
    class_id: '1a2b3c4d-5e6f-7890-abcd-ef1234567890',
    user_id: 'f6a7b8c9-d0e1-2345-fghi-678901234567',
  },
  {
    id: 's2b3c4d5-e6f7-8901-bcde-f23456789012',
    name: 'David Brown',
    age: 17,
    class_id: '1a2b3c4d-5e6f-7890-abcd-ef1234567890',
    user_id: 'f6a7b8c9-d0e1-2345-fghi-678901234567',
  },
  {
    id: 's3c4d5e6-f7g8-9012-cdef-345678901234',
    name: 'Lisa Taylor',
    age: 15,
    class_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567891',
    user_id: 'e5f6a7b8-c9d0-1234-efgh-567890123456',
  },
  {
    id: 's4d5e6f7-g8h9-0123-defg-456789012345',
    name: 'Michael Johnson',
    age: 16,
    class_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567891',
    user_id: 'f6a7b8c9-d0e1-2345-fghi-678901234567',
  },
  {
    id: 's5e6f7g8-h9i0-1234-efgh-567890123456',
    name: 'Sarah Wilson',
    age: 17,
    class_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567891',
    user_id: 'e5f6a7b8-c9d0-1234-efgh-567890123456',
  },
  {
    id: 's6f7g8h9-i0j1-2345-fghi-678901234567',
    name: 'James Anderson',
    age: 16,
    class_id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567891',
    user_id: 'f6a7b8c9-d0e1-2345-fghi-678901234567',
  },
  {
    id: 's7g8h9i0-j1k2-3456-ghij-789012345678',
    name: 'Olivia Martinez',
    age: 15,
    class_id: '1a2b3c4d-5e6f-7890-abcd-ef1234567890',
    user_id: 'f6a7b8c9-d0e1-2345-fghi-678901234567',
  },
];

async function generate() {
  // delete all data
  await prisma.user.deleteMany({});

  await prisma.class.deleteMany({});
  await prisma.student.deleteMany({});

  // insert users
  const salt = await bcrypt.genSalt(10);
  const newUsers = users.map((user) => {
    const hashPwd = bcrypt.hashSync(user.password, salt);
    const newUser = { ...user, password_hash: hashPwd };
    delete newUser.password;

    return newUser;
  });

  await prisma.user.createMany({ data: newUsers, skipDuplicates: true });
  console.log(`Users inserted`);

  // insert classes
  await prisma.class.createMany({ data: classes, skipDuplicates: true });
  console.log(`Classes inserted.`);

  // insert students
  await prisma.student.createMany({ data: students, skipDuplicates: true });
  console.log(`Students inserted.`);
}

generate().catch((e) => {
  console.error(e);
});
