const scraper = (products, type) => {
  let newProductList = [];
  let prodList = JSON.parse(products);

  const trimUrlToHandle = url => {
    let newHandle = url.split('/')[3];
    return newHandle;
  };

  for (let index = 0; index < prodList.products.length; index++) {
    const title = prodList.products[index].item.name;
    const tag = prodList.products[index].item.brand;
    const handle = prodList.products[index].item.hasOwnProperty('offers') ? trimUrlToHandle(prodList.products[index].item.offers.url) : 'NO HANDLE';
    const imageUrl = prodList.products[index].item.image === '--' ? 'NO IMAGE' : prodList.products[index].item.image;
    const product = {
      Handle: handle,
      Title: title,
      Type: type,
      Tags: tag,
      'Image Src': imageUrl
    };
    newProductList.push(product);
  }

  console.log(JSON.stringify(newProductList));

  return newProductList;
};

export default scraper;
