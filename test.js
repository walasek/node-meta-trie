const glob = require('glob');
const path = require('path');
const test = require('zora');

async function runTestFile(file){
	await test('Testing file '+file, async (t) => {
		await require(path.resolve(file))(t);
	});
}

async function _run(){
	glob.sync('./tests/**/*.test.js').forEach(async (file) => {
		await runTestFile(file);
	});
}

if(process.argv[2]){
	runTestFile(process.argv[2]);
}else{
	_run();
}
