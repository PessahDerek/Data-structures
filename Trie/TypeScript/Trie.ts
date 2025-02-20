
class TrieNode extends Map<string, TrieNode | null> {
    end: boolean = false;
    lacks(key: string) {
        return !this.has(key)
    }
}

class Trie {
    root: TrieNode = new TrieNode();

    constructor() {
        this.root = new TrieNode();
    }

    insertOne(word: string) {
        let currentRoot = this.root
        for (let i = 0; i < word.length; i++) {
            const isInRoot = currentRoot.has(word[i]);
            if (isInRoot) {
                // shift to the next root
                currentRoot = currentRoot.get(word[i]) as TrieNode
                // currentRoot.end = isLast
            } else {
                currentRoot.set(word[i], new TrieNode())
                currentRoot = currentRoot.get(word[i]) as TrieNode
                // currentRoot.end = isLast;
            }
        }
        currentRoot.end = true;
    }
    set allWords(words: Array<string>) {
        for (const word of words) {
            this.insertOne(word)
        }
    }

    get allWords() {
        return this.getAllWords(this.root)
    }

    protected getAllWords(root: TrieNode = this.root, word: string = "", words: Array<string> = []) {
        const keys = [...root.keys()]
        // console.log(root)
        for (const key of keys) {
            const found = root.get(key)
            if (found) {
                if (found.end) {
                    words.push(word + key)
                }
                this.getAllWords(found, word + key, words)
            }
        }
        return words
    }
    hasWord(word: string, node: TrieNode = this.root): boolean {
        let root = node
        for (const char of word) {
            if (root.lacks(char)) {
                return false
            }
            root = root.get(char) ?? new TrieNode()
        }
        return true
    }

    startsWith(chars: string, root: TrieNode = this.root): Array<string> {
        let node = root
        for (const char of chars) {
            if (node.lacks(char)) {
                return []
            }
            node = node.get(char) ?? new TrieNode()
        }
        return this.getAllWords(node, chars)
    }
}

const trie = new Trie()
trie.allWords = ['cow', 'cows', 'cowards', 'pow']
console.log("All words: ", trie.allWords)
// trie.insertOne('caseoh')
// console.log("New all: ", trie.allWords)
console.log("Words starting with co: ", trie.startsWith("co"))
console.log(`Size: ${trie.root.size}`)
// console.log(trie.root)

