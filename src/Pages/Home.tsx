import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../Store";
import {
  addList,
  removeList,
  updateList,
  addSubItem,
  updateSubItem,
  removeSubItem,
} from "../Features/HomeSlice";
import "../Home.css";

export default function ShoppingList() {
  const dispatch = useDispatch();
  const lists = useSelector((state: RootState) => state.home.lists);

  const [form, setForm] = useState({
    name: "",
    category: "",
    notes: "",
    image: "",
  });
  const [imageOption, setImageOption] = useState<"upload" | "url" | "none">(
    "none"
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [subForms, setSubForms] = useState<
    Record<
      string,
      {
        name: string;
        quantity: number;
        notes?: string;
        image?: string;
        editId?: string;
        imageOption?: "upload" | "url" | "none";
      }
    >
  >({});

  // --- Handle main list submission ---
  const handleListSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addList({ ...form, dateAdded: new Date().toISOString(), items: [] })
    );
    setForm({ name: "", category: "", notes: "", image: "" });
    setImagePreview(null);
    setImageOption("none");
  };

  // --- Handle sub-item submit (add or update) ---
  const handleSubItemSubmit = (listId: string) => {
    const subForm = subForms[listId];
    if (!subForm?.name) return;

    const newSubItem = {
      name: subForm.name,
      quantity: subForm.quantity,
      notes: subForm.notes,
      image: subForm.image,
      dateAdded: new Date().toISOString(),
    };

    if (subForm.editId) {
      dispatch(
        updateSubItem({ listId, subId: subForm.editId, updates: newSubItem })
      );
    } else {
      dispatch(addSubItem({ listId, subItem: newSubItem }));
    }

    setSubForms({
      ...subForms,
      [listId]: {
        name: "",
        quantity: 1,
        notes: "",
        image: "",
        imageOption: "none",
      },
    });
  };

  // --- Handle file upload ---
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    target: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setSubForms({
        ...subForms,
        [target]: { ...subForms[target], image: reader.result as string },
      });
    };
    reader.readAsDataURL(file);
  };

  // --- Sync URL image preview ---
  useEffect(() => {
    Object.keys(subForms).forEach((key) => {
      const sub = subForms[key];
      if (sub?.imageOption === "url" && sub?.image) {
        setSubForms((prev) => ({
          ...prev,
          [key]: { ...prev[key], image: sub.image },
        }));
      }
    });
  }, [subForms]);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🛍️ Shop'Again</h1>

      {/* Main List Form */}
      <form
        onSubmit={handleListSubmit}
        className="space-y-2 border p-4 rounded-lg bg-white shadow-md"
      >
        <input
          type="text"
          placeholder="List Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Notes..."
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="border p-2 w-full rounded"
        />

        <div className="mt-2">
          <label className="font-semibold">Image Source:</label>
          <div className="flex gap-3 mt-1">
            <label>
              <input
                type="radio"
                checked={imageOption === "upload"}
                onChange={() => {
                  setImageOption("upload");
                  setImagePreview(null);
                  setForm({ ...form, image: "" });
                }}
              />{" "}
              Upload
            </label>
            <label>
              <input
                type="radio"
                checked={imageOption === "url"}
                onChange={() => {
                  setImageOption("url");
                  setImagePreview(null);
                  setForm({ ...form, image: "" });
                }}
              />{" "}
              URL
            </label>
            <label>
              <input
                type="radio"
                checked={imageOption === "none"}
                onChange={() => {
                  setImageOption("none");
                  setImagePreview(null);
                  setForm({ ...form, image: "" });
                }}
              />{" "}
              None
            </label>
          </div>

          {imageOption === "upload" && (
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () =>
                  setImagePreview(reader.result as string);
                reader.readAsDataURL(file);
              }}
              className="mt-2"
            />
          )}

          {imageOption === "url" && (
            <input
              type="url"
              placeholder="Enter image URL"
              value={form.image}
              onChange={(e) => setForm({ ...form, image: e.target.value })}
              className="border p-2 w-full mt-2 rounded"
            />
          )}

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="h-24 w-24 mt-2 rounded shadow"
            />
          )}
        </div>

        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add List
        </button>
      </form>

      {/* Render Lists */}
      <ul className="mt-5 space-y-4">
        {lists.map((list) => (
          <li
            key={list.id}
            className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">{list.name}</h2>
              <button
                onClick={() => dispatch(removeList(list.id))}
                className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
              >
                Delete List
              </button>
            </div>
            <p className="text-sm text-gray-500">{list.category}</p>
            {list.notes && <p className="mt-1 text-sm">{list.notes}</p>}
            {list.image && (
              <img
                src={list.image}
                alt={list.name}
                className="h-24 w-24 object-cover rounded-md shadow mt-2"
              />
            )}

            {/* Sub-items */}
            <ul className="mt-3 ml-3 space-y-2">
              {list.items.map((i) => (
                <li
                  key={i.id}
                  className="border p-2 rounded-md flex justify-between items-center"
                >
                  <div>
                    <strong>{i.name}</strong> ({i.quantity})
                    {i.notes && (
                      <p className="text-xs text-gray-500">{i.notes}</p>
                    )}
                    {i.image && (
                      <img
                        src={i.image}
                        alt={i.name}
                        className="h-16 w-16 mt-1 object-cover rounded"
                      />
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() =>
                        setSubForms({
                          ...subForms,
                          [list.id]: {
                            ...i,
                            editId: i.id,
                            imageOption: i.image ? "url" : "none",
                          },
                        })
                      }
                      className="bg-yellow-500 text-white text-xs px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        dispatch(
                          removeSubItem({ listId: list.id, subId: i.id })
                        )
                      }
                      className="bg-red-500 text-white text-xs px-2 py-1 rounded"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {/* Add/Edit Sub-item */}
            <div className="mt-3 border-t pt-2">
              <input
                type="text"
                placeholder="Item name"
                value={subForms[list.id]?.name || ""}
                onChange={(e) =>
                  setSubForms({
                    ...subForms,
                    [list.id]: { ...subForms[list.id], name: e.target.value },
                  })
                }
                className="border p-2 w-full rounded mb-2"
              />
              <input
                type="number"
                placeholder="Quantity"
                value={subForms[list.id]?.quantity || 1}
                onChange={(e) =>
                  setSubForms({
                    ...subForms,
                    [list.id]: {
                      ...subForms[list.id],
                      quantity: Number(e.target.value),
                    },
                  })
                }
                className="border p-2 w-full rounded mb-2"
              />
              <div className="flex gap-2 items-center mb-2">
                <label>
                  <input
                    type="radio"
                    checked={subForms[list.id]?.imageOption === "upload"}
                    onChange={() =>
                      setSubForms({
                        ...subForms,
                        [list.id]: {
                          ...subForms[list.id],
                          imageOption: "upload",
                          image: "",
                        },
                      })
                    }
                  />{" "}
                  Upload
                </label>
                <label>
                  <input
                    type="radio"
                    checked={subForms[list.id]?.imageOption === "url"}
                    onChange={() =>
                      setSubForms({
                        ...subForms,
                        [list.id]: {
                          ...subForms[list.id],
                          imageOption: "url",
                          image: "",
                        },
                      })
                    }
                  />{" "}
                  URL
                </label>
                <label>
                  <input
                    type="radio"
                    checked={subForms[list.id]?.imageOption === "none"}
                    onChange={() =>
                      setSubForms({
                        ...subForms,
                        [list.id]: {
                          ...subForms[list.id],
                          imageOption: "none",
                          image: "",
                        },
                      })
                    }
                  />{" "}
                  None
                </label>
              </div>

              {subForms[list.id]?.imageOption === "upload" && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, list.id)}
                  className="mb-2"
                />
              )}
              {subForms[list.id]?.imageOption === "url" && (
                <input
                  type="url"
                  placeholder="Enter image URL"
                  value={subForms[list.id]?.image || ""}
                  onChange={(e) =>
                    setSubForms({
                      ...subForms,
                      [list.id]: {
                        ...subForms[list.id],
                        image: e.target.value,
                      },
                    })
                  }
                  className="border p-2 w-full rounded mb-2"
                />
              )}

              <button
                onClick={() => handleSubItemSubmit(list.id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                {subForms[list.id]?.editId ? "Update Item" : "Add Item"}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
