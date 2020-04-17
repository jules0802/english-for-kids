// sorting
const sortStatistics = () => {
  const getSort = ({ target }) => {
    console.log(target.dataset.order);
    // eslint-disable-next-line no-param-reassign
    target.dataset.order = -(target.dataset.order || -1);
    const { order } = target.dataset;
    const index = [...target.parentNode.cells].indexOf(target);
    const collator = new Intl.Collator(['en', 'ru'], { numeric: true });
    const comparator = (ind, ord) => (a, b) => ord * collator.compare(
      a.children[ind].innerHTML,
      b.children[ind].innerHTML,
    );

    for (const tBody of target.closest('table').tBodies) {
      tBody.append(...[...tBody.rows].sort(comparator(index, order)));
    }

    for (const cell of target.parentNode.cells) {
      cell.classList.toggle('sorted', cell === target);
    }
  };

  document.querySelectorAll('.table_sort thead').forEach((tableTH) => tableTH.addEventListener('click', (event) => getSort(event)));
};

export { sortStatistics };
