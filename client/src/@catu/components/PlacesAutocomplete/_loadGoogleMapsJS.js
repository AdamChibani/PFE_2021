import scriptJs from 'scriptjs';

function loadGoogleMapsJS() {
    const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;
    return new Promise((resolve, reject) => {
		if (!apiKey) {
			if (process.env.NODE_ENV !== 'production') console.error('Google Map needs a key to work');
            reject('Google Map needs a key to work');
            return;
		}

		if (typeof window === 'undefined') {
			if (process.env.NODE_ENV !== 'production') console.error('Google Map cannot be loaded outside browser env');
            reject('Google Map cannot be loaded outside browser env');
            return;
        }
        
        if (window.loadGoogleMapsJS_isLoading) {
            if (process.env.NODE_ENV !== 'production') console.log('A Google Map loader promise is already been executed');
            reject('A Google Map loader promise is already been executed');
            return;
        } else {
            if (process.env.NODE_ENV !== 'production') console.log(`Loading Google Maps JS files with key ${apiKey}`);
            window.loadGoogleMapsJS_isLoading = true;
        }

		if (window.google && window.google.maps) {
            if (process.env.NODE_ENV !== 'production') console.log('Google Map is already loaded');
            window.loadGoogleMapsJS_isLoading = false;
            resolve(true);
            return;
		}

		const src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=_loadGoogleMapsJS`;

		scriptJs(src, () => {
            window.loadGoogleMapsJS_isLoading = false;
			if (typeof window.google === 'undefined') {
                if (process.env.NODE_ENV !== 'production') console.error('Google Maps initialization error');
                reject('Google Maps initialization error');
			} else {
                if (process.env.NODE_ENV !== 'production') console.log('Google Maps initialized');
                resolve(true)
            }
		});
    });
}

export default loadGoogleMapsJS;