import sql from '../config/db.js';

export const getAllProduct = async (req,res) => {
    try{
        const products = await sql`
        SELECT * FROM products
        ORDER BY created_at DESC
        `;
        console.log('Products fetched successfully:', products);
        res.json({ success: true, data: products });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }
};
export const createProduct = async (req,res) => {
    const { name, image, price } = req.body;
    if (!name || !image || !price) {
        return res.status(400).json({success:false, error: 'Name, image, and price are required' });
    }
    try {
        const newProduct = await sql`
            INSERT INTO products (name, image, price)
            VALUES (${name}, ${image}, ${price})
            RETURNING *
        `;
        console.log('Product created successfully:', newProduct);
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }

};
export const getProduct = async (req,res) => {
    const { id } = req.params;
    try {
        const product = await sql`
            SELECT * FROM products WHERE id = ${id}
        `;
        if (!product) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.json({ success: true, data: product[0] });
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }

};
export const updateProduct = async (req,res) => {
    const { id } = req.params;
    const { name, image, price } = req.body;
    try {
        const updatedProduct = await sql`
            UPDATE products
            SET name = ${name}, image = ${image}, price = ${price}
            WHERE id = ${id}
            RETURNING *
        `;
        if (!updatedProduct || updatedProduct.length === 0) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.json({ success: true, data: updatedProduct[0] });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }

};
export const deleteProduct = async (req,res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await sql`
            DELETE FROM products WHERE id = ${id} RETURNING *
        `;
        if (!deletedProduct || deletedProduct.length === 0) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }
        res.json({ success: true, data: deletedProduct[0] });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, error: 'Internal server error' });
    }

};