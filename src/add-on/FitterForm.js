import React, { useState } from "react";

const FilterForm = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setDistricts(
      provinces.filter((district) => district.province === province)
    );
  };

  return (
    <form>
      <label htmlFor="province">Tỉnh</label>
      <select id="province" name="province" onChange={handleProvinceChange}>
        {provinces.map((province) => (
          <option value={province.id} key={province.id}>
            {province.name}
          </option>
        ))}
      </select>
      <label htmlFor="district">Huyện</label>
      <select id="district" name="district" disabled={!districts.length}>
        {districts.map((district) => (
          <option value={district.id} key={district.id}>
            {district.name}
          </option>
        ))}
      </select>
      <button type="submit">Tìm kiếm</button>
    </form>
  );
};

const provinces = [
  { id: 1, name: "Kon Tum" },
  { id: 2, name: "Gia Lai" },
  { id: 3, name: "Đăk Lăk" },
  { id: 4, name: "Đăk Nông" },
  { id: 5, name: "Lâm Đồng" },
];

const districts = [
  { id: 1, name: "Thành phố Kon Tum", province: 1 },
  { id: 2, name: "Huyện Đắk Glei", province: 1 },
  { id: 3, name: "Huyện Ngọc Hồi", province: 1 },
  { id: 4, name: "Huyện Đắk Tô", province: 1 },
  { id: 5, name: "Huyện Kon Rẫy", province: 1 },
  { id: 6, name: "Huyện Đắk Hà", province: 1 },
  { id: 7, name: "Huyện Sa Thầy", province: 1 },
  { id: 8, name: "Huyện Tu Mơ Rông", province: 1 },
  { id: 9, name: "Huyện Ia H' Drai", province: 1 },
  { id: 10, name: "Huyện Ngọc Hồi", province: 2 },
  { id: 11, name: "Huyện Ngọc Hồi", province: 2 },
  { id: 12, name: "Huyện Ngọc Hồi", province: 2 },
];

export default FilterForm;
