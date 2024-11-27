import { NextResponse } from 'next/server';

// Mock database
let todos = [];

export async function GET() {
    // Return the list of todos
    return NextResponse.json(todos);
}

export async function POST(req) {
    try {
        const { title } = await req.json();

        // Validate that title is provided
        if (!title || title.trim() === '') {
            return NextResponse.json({ message: 'Title is required' }, { status: 400 });
        }

        // Create a new todo item with a unique id
        const newTodo = { id: todos.length + 1, title };

        // Add the new todo to the todos array
        todos.push(newTodo);

        // Return the new todo item as a JSON response
        return NextResponse.json(newTodo);
    } catch (error) {
        return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
    }
}
