export const BUNGIEAPIKEY = () => {
	if(process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
		return `fc470e42da39445380152053f1a86267`;
	}
	return process.env.REACT_APP_APIKEY;
}