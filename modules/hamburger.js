const hamburger = () => {
  const remove = document.querySelectorAll('.remove');
  remove.forEach((rmBtn) => {
    const hamb = document.getElementById(rmBtn.id.replace('remove', 'myLinks'));
    rmBtn.addEventListener('click', () => {
      rmBtn.style.display = 'none';
      hamb.style.display = 'flex';
    });
  });
};

export default hamburger;