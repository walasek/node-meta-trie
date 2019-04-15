const TrieNode = require('../index');

module.exports = (test) => {
	test.test('Trie can hold some data', (t) => {
		const n = new TrieNode();

		const vals = [
			1,2,3,
			'A','B','C'
		];

		for(let i = 0; i < vals.length; i++){
			n.put('K'+i, vals[i]);
		}

		for(let i = 0; i < vals.length; i++){
			t.equal(n.get('K'+i), vals[i], 'Got proper value');
		}

		t.notOk(n.get('_does_not_exist'), 'Unknown keys handled');

		let count = 0;
		for([key, value] of n){
			t.equal(value, vals[key.substr(1)], 'Proper iterator value');
			count++;
		}
		t.equal(count, vals.length, 'Proper iterator count');
	});
	test.test('Trie can hold lots of data', (t) => {
		const n = new TrieNode();

		const target_n = 1000000;
		const _mem = {};
		const ALPHA = 'abcdefghijklmnoprstuvwqxyz1234567890';
		const VALUES = [1,2,3,4,5,6,7];
		for(let i = 0; i < target_n; i++){
			const len = 1+Math.random()*10;
			let key = '';
			while(key.length < len)
				key += ALPHA.charAt(Math.floor(Math.random()*ALPHA.length));
			const val = VALUES[Math.floor(Math.random()*VALUES.length)];
			n.put(key, val);
			_mem[key] = val;
		}

		const keys = Object.keys(_mem);
		for(let i = 0; i < keys.length; i++){
			if(n.get(keys[i]) != _mem[keys[i]])
				t.fail('Wrong value');
		}

		let count = 0;
		for([key, value] of n){
			if(value != _mem[key])
				t.fail('Wrong iterator value');
			count++;
		}
		t.equal(count, keys.length, 'Proper iterator count');
	});
};