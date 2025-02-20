import kotlin.Int
import kotlin.collections.mutableListOf
import kotlin.io.println

class TrieNode : MutableMap<Char, TrieNode?> by mutableMapOf() {
    var end: Boolean = false

    public fun has(char: Char): Boolean {
        return this.contains(char)
    }
    public fun lacks(char: Char): Boolean {
        return !this.has(char)
    }
}

class Trie {
    var root: TrieNode = TrieNode()

    fun insertOneWord(word: String) {
        var currentNode = this.root
        for (char in word) {
            if (currentNode.lacks(char)) {
                currentNode.set(char, TrieNode())
            }
            val child = currentNode.get(char)
            currentNode = if (child == null) TrieNode() else child
        }
        currentNode.end = true
    }

    var allWords: MutableList<String>
        get() {
            val words = this.getAllWords(this.root, "", mutableListOf())
            return words
        }
        set(words: MutableList<String>) {
            for (word in words) {
                this.insertOneWord(word)
            }
        }

    protected fun getAllWords(
            node: TrieNode,
            word: String,
            words: MutableList<String>
    ): MutableList<String> {
        for (key in node.keys) {
            val getNode = node.get(key)
            if (getNode !== null) {
                if (getNode.end) {
                    words.add(word + key.toString())
                }
                this.getAllWords(getNode, word + key.toString(), words)
            }
        }
        return words
    }

    fun countWords(root: TrieNode = this.root): Int {
        var mutableCount = 0
        if (root.end) {
            mutableCount += 1
        }
        for (child in root.values) {
            if (child is TrieNode) mutableCount += this.countWords(child)
        }
        return mutableCount
    }
}

fun main() {
    println("Started")
    val words: MutableList<String> = mutableListOf("c", "cow", "coward", "cows")
    val tree = Trie()
    tree.allWords = words
    println(tree.countWords())
}
