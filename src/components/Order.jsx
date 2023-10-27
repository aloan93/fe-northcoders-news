export default function Order({ order, setOrder, setPage }) {
  function inputOrder(e) {
    setOrder(e.target.value);
    setPage(1);
  }

  return (
    <form onChange={inputOrder} className="order">
      <fieldset>
        <legend>Order</legend>
        <label className="radio-labels">
          Descending
          <input
            type="radio"
            name="order"
            value="desc"
            readOnly
            checked={order === "desc"}
          />
        </label>
        <label className="radio-labels">
          Ascending
          <input
            type="radio"
            name="order"
            value="asc"
            readOnly
            checked={order === "asc"}
          />
        </label>
      </fieldset>
    </form>
  );
}
