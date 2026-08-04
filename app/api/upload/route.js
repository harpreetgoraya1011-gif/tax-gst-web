import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file received!' }, { status: 400 });
    }

    console.log("File received:", file.name);

    return NextResponse.json({ 
      success: true, 
      message: 'File uploaded successfully!',
      fileName: file.name 
    });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
