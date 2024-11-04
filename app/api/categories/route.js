import connectToDatabase from '@/app/lib/connectMongoose';
import Categories from "@/app/models/categories";

export const dynamic = 'force-dynamic'
export async function GET(req) {
  console.log(req);
  await connectToDatabase();
  console.log('123concatea');
  
  try {
    console.log('123concate');
    
    // Fetch the categories document
    const categoryDoc = await Categories.findOne({});
    console.log('123concate2');

    if (!categoryDoc) {
      return new Response(JSON.stringify({ message: "Categories not found" }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    console.log(categoryDoc.categories);
    
    // Send back the categories array
    return new Response(JSON.stringify({ categories: categoryDoc }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error) {
    console.error("Error fetching categories:", error);

    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
