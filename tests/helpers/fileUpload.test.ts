import { v2 as cloudinary } from 'cloudinary';
import { fileUpload } from '../../src/helpers/fileUpload';

cloudinary.config({
    cloud_name: 'dfaxfcvhh',
    api_key: '832124746656838',
    api_secret: 'tsJmLW_p06L2A6Io2kwMeGg6yNI',
    secure: true
})

describe('Pruebas en fileupload', () => {
    test('should upload the file to cloudinary', async () => {
        const imageUrl = 'https://delorean.com/wp-content/uploads/2022/05/Asset-1@3x.png';
        const resp = await fetch(imageUrl);
        const blob = await resp.blob();
        const file = new File([blob], 'foto.png');
        const url = await fileUpload(file)
        expect(typeof url).toBe('string');

        const segments = url.split('/');
        const imageId = segments[segments.length -1].replace('.png','')
        await cloudinary.api.delete_resources(['journal-app/'+imageId],{
            resource_type: 'image'
        })
    })

    test('should return null', async () => {
        const file = new File([], 'foto.png');
        const url = await fileUpload(file)
        expect(url).toBe(null);
    })
})