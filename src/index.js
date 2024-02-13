const Fs = require('fs')

const touch = async (path) => {
	const time = Math.floor(Date.now() / 1e3)
	try {
		await Fs.promises.utimesSync(path, time, time)
	} catch (error) {
		if (error.code !== 'ENOENT') { throw error }
		(await Fs.promises.open(path, 'w')).close()
	}
}

const touchSync = (path) => {
	const time = Math.floor(Date.now() / 1e3)
	try {
		Fs.utimesSync(path, time, time)
	} catch (error) {
		if (error.code !== 'ENOENT') { throw error }
		Fs.closeSync(Fs.openSync(path, 'w'))
	}
}

module.exports = {
	touch,
	touchSync,
}
