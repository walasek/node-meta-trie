const benchmark = require('nodemark');
const TrieNode = require('./Trie');

async function test(name, fn){
	const result = await benchmark((done) => {
		fn();
		done();
	});
	console.log(`Finished ${name} result: ${result.toString()} ${result.toString('milliseconds')}`);
}

function _keyGenWide(i){
	return 'K'+i;
}

const ALPHA = 'abcdefghijklmnoprstuvwqxyz1234567890';
function _keyGenDeep(i, n){
	const l = 1+Math.random()*(n+'').length;
	let result = '';
	while(result.length < l)
		result += ALPHA[Math.round(Math.random()*ALPHA.length)];
	return result;
}

function prepare(n, gen){
	const tree = new TrieNode();

	for(let i = 0; i < n; i++){
		tree.put(gen(i, n), Math.random());
	}

	return tree;
}

async function testForNRands(n){
	const gens = [
		['Wide tree', _keyGenWide],
		['Deep tree', _keyGenDeep]
	];

	for(let i = 0; i < gens.length; i++){
		const tree = prepare(n, _keyGenWide);
		await test(`${gens[i][0]}, random read, ${n} entries`, () => tree.get(gens[i][1](Math.floor(Math.random()*n), n)));
	}
	console.log('');
}

(async () => {
	for(let i = 10; i < 10000000; i*=10)
		await testForNRands(i);
})();