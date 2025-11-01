import React from "react";
import "./List.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useEffect } from "react";
import axios from "axios";
const List = ({ url }) => {
  const [list, setList] = useState([]);
  const fetchList = async () => {
    const response = await axios.get(`${url}/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Something Went Wrong !");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Something went Wrong!");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div key={index} className="list-table-format">
              <img src={`${url}/uploads/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>Rs. {item.price}</p>
              <p className="cursor" onClick={() => removeFood(item._id)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
