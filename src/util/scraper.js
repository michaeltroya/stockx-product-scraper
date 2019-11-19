const scraper = (products, type) => {
  let newProductList = [];
  let prodList;
  let errors = {};

  const trimUrlToHandle = url => {
    let newHandle = url.split('/')[3];
    return newHandle;
  };

  const tryParseJSON = jsonString => {
    try {
      var o = JSON.parse(jsonString);

      if (o && typeof o === 'object') {
        return true;
      }
    } catch (e) {}

    return false;
  };

  if (products === `{"products":[]}`) {
    errors.emptyError = 'Form can not be empty';
  }

  if (!tryParseJSON(products)) {
    errors.formatError = 'Invalid format';
  }

  if (errors.emptyError || errors.formatError) {
    return errors;
  } else {
    prodList = JSON.parse(products);
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

    return newProductList;
  }
};

export default scraper;
