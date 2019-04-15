const TrieNode = require('./index');

module.exports = () => {
	const tree = new TrieNode();
	return new Proxy({}, {
		get: function(target, name){
			if(name == 'toString')
				return () => '[Iterable TireNode]';
			if(name == 'toJSON'){
				const obj = {};
				for([key, value] of tree)
					obj[key] = value;
				return () => obj;
			}
			return tree.get(name);
		},
		set: function(target, prop, value){
			tree.put(prop, value);
		}
	});
}