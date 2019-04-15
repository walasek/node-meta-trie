const TreeDict = require('../dict');

module.exports = (test) => {
	test.test('Trie dict toString', (t) => {
		const tree = TreeDict();
		tree['A'] = 'B';
		tree[0] = 'nums';

		t.ok(tree.toString(), 'Has a string representation');

		t.equal(tree['A'], 'B');
		t.equal(tree[0], 'nums');

		test.test('Trie dict toJSON', (t) => {
			const json = JSON.stringify(tree);
			const json2 = tree.toJSON();
			const obj = JSON.parse(json);

			t.equal(obj['A'], 'B');
			t.equal(obj[0], 'nums');

			t.equal(obj['A'], tree['A']);
			t.equal(obj[0], tree[0]);
		});
	});
}