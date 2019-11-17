const scraper = products => {
  let newProductList = [];
  let prodList = JSON.parse(products);

  const trimUrlToHandle = url => {
    var newHandle = url.split('/')[3];
    return newHandle;
  };

  for (let index = 0; index < prodList.products.length; index++) {
    const title = prodList.products[index].item.name;
    const tag = prodList.products[index].item.brand;
    const handle = trimUrlToHandle(prodList.products[index].item.offers.url);
    const imageUrl = prodList.products[index].item.image;
    const product = {
      Handle: handle,
      Title: title,
      Type: 'Shoes',
      Tags: `${tag}`,
      'Image Src': imageUrl
    };
    newProductList.push(product);
  }

  console.log(JSON.stringify(newProductList));

  return newProductList;
};

export default scraper;
