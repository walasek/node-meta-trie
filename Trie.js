/**
 * @class
 * A Trie node
 * @description A single node of a Trie structure.
 */
class TrieNode {
	constructor(){
		// For memory optimisation we use an array instead of anything else
		// The property name must be short, we assume exponential amounts of instances
		this._ = [false, {}, null]; // is_leaf, children, leaf_meta
	}
	// Properties by accessor function, we care mostly about memory, not access times
	get is_leaf(){
		return this._[0];
	}
	set is_leaf(v){
		return this._[0] = v;
	}
	get children(){
		return this._[1];
	}
	get meta(){
		return this._[2];
	}
	set meta(data){
		return this._[2] = data;
	}
	// Main algorithms, structural not recursive
	getNodeForKey(key, touch=false){
		let current_key = key;
		let current_node = this;
		while(current_key.length > 0){
			const letter = current_key.charAt(0);
			const child = current_node.children[letter];
			if(child){
				current_node = child;
			}else{
				// Does not exist
				if(touch){
					const new_node = new TrieNode();
					current_node.children[letter] = new_node;
					current_node = new_node;
				}else{
					return null;
				}
			}
			current_key = current_key.substr(1);
		}
		return current_node;
	}
	// High-level functions
	put(key, value){
		const node = this.getNodeForKey(key, true);
		node.is_leaf = true;
		node.meta = value;
	}
	get(key){
		const node = this.getNodeForKey(key);
		if(node && node.is_leaf)
			return node.meta;
		return null;
	}
	// Iterator, iterative not recursive
	[Symbol.iterator](){
		// The stack describes what should be called next
		var state_stack = [];
		// -1 means leaf
		state_stack.push([this, -1, '']);

		return {
			next(){
				while(state_stack.length > 0){
					const opt = state_stack.slice(-1)[0];
					const node = opt[0];
					const child_idx = opt[1];
					const prefix = opt[2];

					if(child_idx == -1){
						opt[1]++;
						if(node.is_leaf){
							 // Try first child next
							return {value: [prefix, node.meta], done: false}
						}
					}else{
						const children = Object.keys(node.children);
						const child = node.children[children[opt[1]]];
						if(child){
							state_stack.push([child, -1, prefix+children[opt[1]]]);
							opt[1]++;
						}else{
							// Done with this one
							state_stack.pop();
						}
					}
				}
				return {value: undefined, done: true};
			}
		}
	}
}

module.exports = TrieNode;