import { useSelector } from "react-redux";

const CreateListing = () => {
  const userRef = useSelector((state) => state.user.currentUser._id);
  console.log(userRef);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const elements = e.target.elements;
    formData.append("name", elements.name.value);
    formData.append("description", elements.description.value);
    formData.append("address", elements.address.value);
    formData.append("regularPrice", elements.regularPrice.value);
    formData.append("discountedPrice", elements.discountedPrice.value);
    formData.append("bathrooms", elements.bathrooms.value);
    formData.append("bedrooms", elements.bedrooms.value);
    formData.append("furnished", elements.furnished.checked);
    formData.append("parking", elements.parking.checked);
    formData.append("sell", elements.sell.checked);
    formData.append("rent", elements.rent.checked);
    formData.append("userRef", userRef);

    const files = elements.images.files;
    if (files.length > 6) {
      alert("You can only upload a maximum of 6 images");
      return;
    }

    for (let i = 0; i < files.length; i++) {
      formData.append("images", files[i]);
    }

    try {
      const res = await fetch("/api/listing/create", {
        method: "POST",
        body: formData,
        // credentials: "include",
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-3" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="64"
            minLength="10"
            required
          ></input>
          <textarea
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            id="description"
            required
          ></textarea>
          <input
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          ></input>
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sell" className="w-5"></input>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5"></input>{" "}
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5"></input>{" "}
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5"></input>{" "}
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bedrooms"
                min="1"
                required
                className="p-3 border border-gray-400 rounded-lg"
              ></input>
              <span>Beds</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="bathrooms"
                min="1"
                required
                className="p-3 border border-gray-400 rounded-lg"
              ></input>
              <span>Baths</span>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="regularPrice"
                required
                className="p-3 border border-gray-400 rounded-lg"
              ></input>
              <div className="flex flex-col items-center">
                <p>Regular Price</p>
                <span className="text-xs">(₹ /month)</span>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                id="discountedPrice"
                required
                className="p-3 border border-gray-400 rounded-lg"
              ></input>
              <div className="flex flex-col items-center">
                <p>Discounted Price</p>
                <span className="text-xs">(₹ /month)</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex items-center mb-4">
            <p className="font-semibold">Images</p>
            <span className="text-normal text-gray-400 ml-2">
              The first image will be the cover (max 6)
            </span>
          </div>
          <div className="flex items-center">
            <input
              type="file"
              accept="image/*"
              id="images"
              multiple
              required
              className="p-3 border border-gray-400 rounded-lg w-full"
            ></input>
            {/* <button
              type="button"
              className="bg-green-600 text-white p-3 rounded-lg border border-green-600 uppercase hover:shadow-lg disabled:opacity-50"
            >
              Upload
            </button> */}
          </div>
          <button className="bg-red-600 text-white p-3 rounded-lg border border-red-600 uppercase hover:shadow-lg disabled:opacity-50 my-5">
            Create Listing
          </button>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
