const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
    include: {
      posts: true,
    },
  });
  res.json(user);
});

app.post('/users', async (req, res) => {
  let user = await prisma.user.findUnique({
    where: {
      email: req.body.email,
    },
  });
  if (!user) {
    user = await prisma.user.create({
      data: {
        name: req.body.name,
        email: req.body.email,
      },
    });
  }
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      name: req.body.name,
      email: req.body.email,
    },
  });
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.user.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'User deleted successfully' });
});

app.get('/todos', async (req, res) => {
  const { description, priority, authorId } = req.query;
  let todos;
  if (description && priority && authorId) {
    todos = await prisma.todo.findMany({
      where: {
        description: {
          contains: description.toString(),
        },
        priority: priority === 'true',
        authorId: parseInt(authorId),
      },
      include: {
        author: true,
      },
    });
  } else if (description && priority) {
    todos = await prisma.todo.findMany({
      where: {
        description: {
          contains: description.toString(),
        },
        priority: priority === 'true',
      },
      include: {
        author: true,
      },
    });
  } else if (description && authorId) {
    todos = await prisma.todo.findMany({
      where: {
        description: {
          contains: description.toString(),
        },
        authorId: parseInt(authorId),
      },
      include: {
        author: true,
      },
    });
  } else if (priority && authorId) {
    todos = await prisma.todo.findMany({
      where: {
        priority: priority === 'true',
        authorId: parseInt(authorId),
      },
      include: {
        author: true,
      },
    });
  } else if (description) {
    todos = await prisma.todo.findMany({
      where: {
        description: {
          contains: description.toString(),
        },
      },
      include: {
        author: true,
      },
    });
  } else if (priority) {
    todos = await prisma.todo.findMany({
      where: {
        priority: priority === 'true',
      },
      include: {
        author: true,
      },
    });
  } else if (authorId) {
    todos = await prisma.todo.findMany({
      where: {
        authorId: parseInt(authorId),
      },
      include: {
        author: true,
      },
    });
  } else {
    todos = await prisma.todo.findMany({
      include: {
        author: true,
      },
    });
  }
  res.json(todos);
});

app.post('/todos', async (req, res) => {
  const todo = await prisma.todo.create({
    data: {
      description: req.body.description,
      due: req.body.due,
      priority: req.body.priority,
      authorId: parseInt(req.body.authorId),
    },
  });
  res.json(todo);
});

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await prisma.todo.update({
    where: { id: parseInt(id) },
    data: {
      description: req.body.description,
      due: req.body.dueDate,
      priority: req.body.priority,
      authorId: parseInt(req.body.authorId),
    },
  });
  res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.todo.delete({
    where: { id: parseInt(id) },
  });
  res.json({ message: 'TODO item deleted successfully' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
