import { fileUpload } from "../../src/helpers/fileUpload";
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'doublpp31',
  api_key: '662387279273175',
  api_secret: '9Coc9OvtCRn58IWRlSeCD9t783E',
  secure: true
});

describe('Pruebas en fileUpload', () => { 
  test('debe subir el archivo correctamente a cloudinary', async() => { 
    const imageUrl = 'https://res.cloudinary.com/doublpp31/image/upload/v1657570898/journal/tyuwguxs8jgbvthhuouv.jpg';

    const resp = await fetch(imageUrl);
    const blob = await resp.blob();
    const file = new File([blob], 'img.jpg');

    const url = await fileUpload(file);
    expect(typeof url).toBe('string');

    const segments = url.split('/')
    const imgId = segments[segments.length - 1].replace('.jpg','');

    await cloudinary.api.delete_resources(['journal/'+imgId]);
  });

  test('debe retornar null', async() => { 
    const file = new File([], 'img.jpg');

    const url = await fileUpload(file);
    expect(url).toBe(null);
  })
});