import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store";
import {
  addItem,
  updateItem,
  removeItem,
  sortItems,
  setSearchKeyword,
} from "../Features/HomeSlice";
import { v4 as uuidv4 } from "uuid";
import "../Home.css";

export default function ShoppingList() {
  const dispatch = useDispatch();
  const { items, searchKeyword, sortBy } = useSelector(
    (state: RootState) => state.home
  );

  const [form, setForm] = useState({
    id: "",
    name: "",
    quantity: "",
    category: "",
    notes: "",
    image: "",
    imageOption: "none" as "none" | "upload" | "url",
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.quantity.trim()) return;

    const newItem = {
      id: form.id || uuidv4(),
      name: form.name,
      quantity: form.quantity,
      category: form.category,
      notes: form.notes,
      image: form.image,
      date: new Date().toISOString(),
    };

    if (form.id) dispatch(updateItem(newItem));
    else dispatch(addItem(newItem));

    // Reset form
    setForm({
      id: "",
      name: "",
      quantity: "",
      category: "",
      notes: "",
      image: "",
      imageOption: "none",
    });
    setImagePreview(null);
  };


  const handleDelete = (id: string) => {
    dispatch(removeItem(id));
  };

  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchKeyword(e.target.value));
  };

 
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(sortItems(e.target.value as "name" | "date" | "category"));
  };

 
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (form.imageOption === "upload" && e.target.files?.[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setForm({ ...form, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    } else if (form.imageOption === "url") {
      setImagePreview(form.image);
    }
  };


  const filteredItems = items
    .filter((item) =>
      item.name.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .sort((a: typeof items[0], b: typeof items[0]) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "category") return a.category.localeCompare(b.category);
      if (sortBy === "date")
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      return 0;
    });

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        🛒 Shopp'Again
      </h1>

    
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search items..."
          value={searchKeyword}
          onChange={handleSearch}
          className="border p-2 rounded w-full sm:w-1/2"
        />
        <select
          value={sortBy}
          onChange={handleSort}
          className="border p-2 rounded w-full sm:w-1/3"
        >
          <option value="date">Sort by Date Added</option>
          <option value="name">Sort by Name</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

     
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded-lg shadow-md bg-white"
      >
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="border p-2 rounded"
          />
        </div>

        
        <div className="mt-3">
          <label className="font-semibold">Add Image:</label>
          <div className="flex items-center gap-3 mt-2">
            <select
              value={form.imageOption}
              onChange={(e) =>
                setForm({
                  ...form,
                  imageOption: e.target.value as "none" | "upload" | "url",
                  image: "",
                })
              }
              className="border p-2 rounded"
            >
              <option value="none">None</option>
              <option value="upload">Upload from Device</option>
              <option value="url">Use Image URL</option>
            </select>

            {form.imageOption === "upload" && (
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            )}

            {form.imageOption === "url" && (
              <input
                type="text"
                placeholder="Enter image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                onBlur={handleImageChange}
                className="border p-2 rounded w-full"
              />
            )}
          </div>

         
          {imagePreview && (
            <div className="mt-4 flex flex-col items-start">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-28 w-28 sm:h-32 sm:w-32 object-cover rounded-xl shadow-md border border-gray-200 transition-transform duration-200 hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview(null);
                    setForm({ ...form, image: "" });
                  }}
                  className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center shadow"
                >
                  ✕
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">Image preview</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow w-full"
        >
          {form.id ? "Update Item" : "Add Item"}
        </button>
      </form>

      
      <ul className="mt-6 space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <li
              key={item.id}
              className="border p-4 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-white shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-cover rounded-md shadow border border-gray-200"
                  />
                )}
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    {item.quantity} • {item.category}
                  </p>
                  {item.notes && (
                    <p className="text-xs text-gray-500 mt-1">{item.notes}</p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setForm({
                      id: item.id,
                      name: item.name,
                      quantity: item.quantity,
                      category: item.category,
                      notes: item.notes ?? "",
                      image: item.image ?? "",
                      imageOption: "none",
                    })
                  }
                  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No items found. Add some shopping items above!
          </p>
        )}
      </ul>
    </div>
  );
}
