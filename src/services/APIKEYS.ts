export const BUNGIEAPIKEY = () => {
	if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		return process.env.REACT_APP_DEVKEY;
	}
	return process.env.REACT_APP_APIKEY;
}