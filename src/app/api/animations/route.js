import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/animations.json');
const uploadsDir = path.join(process.cwd(), 'public/uploads');

// Ensure uploads dir exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

export async function GET() {
    try {
        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const data = JSON.parse(fileData);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read data' }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file'); // JSON file
        const title = formData.get('title');
        const color = formData.get('color') || 'text-brand-pink';
        const category = formData.get('category') || 'New';

        let lottieSrc = null;

        if (file) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = `${Date.now()}-${file.name}`;
            const filePath = path.join(uploadsDir, fileName);
            fs.writeFileSync(filePath, buffer);
            lottieSrc = `/api/uploads/${fileName}`;
        }

        const fileData = fs.readFileSync(dataFilePath, 'utf8');
        const currentData = JSON.parse(fileData);

        const newItem = {
            id: Date.now().toString(),
            title,
            color,
            category,
            lottieSrc, // If uploaded
            iconName: lottieSrc ? null : 'Box', // Fallback icon if no lottie? or user logic differ
        };

        const updatedData = [newItem, ...currentData];
        fs.writeFileSync(dataFilePath, JSON.stringify(updatedData, null, 2));

        return NextResponse.json(newItem);

    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: 'Failed to process upload' }, { status: 500 });
    }
}
