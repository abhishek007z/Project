import { EditIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";

function ProductCard({ product }) {
  const { deleteProduct, loading } = useProductStore();

  return (
    <div className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow duration-300">
      <figure className="h-52 overflow-hidden bg-base-200">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
          loading="lazy"
        />
      </figure>

      <div className="card-body">
        <h3 className="card-title line-clamp-1">{product.name}</h3>
        <p className="text-primary font-semibold text-lg">${Number(product.price).toFixed(2)}</p>

        <div className="card-actions justify-end mt-3">
          <Link to={`/product/${product.id}`} className="btn btn-sm btn-outline btn-primary">
            <EditIcon className="size-4" />
            Edit
          </Link>

          <button
            type="button"
            className="btn btn-sm btn-error"
            onClick={() => deleteProduct(product.id)}
            disabled={loading}
          >
            <Trash2Icon className="size-4" />
            Delete
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default ProductCard;