const Arr = {
    sort: function(arr) {
        return arr.sort(function(a, b) {
            return a - b;
        });
    },
    equal: function(a1, a2) {
        let sameLength = a1.length == a2.length;
        let sameValues = a1.every(function(v,i) { return v === a2[i]});
        return sameLength && sameValues;
    },

    lastCommonAncestor: function(a1, a2) {

        let ancestor = null;

        for (let i = 0; i < a1.length; i++) {
            if (a1[i] !== a2[i]) {
                break;
            }
            ancestor = a1[i];
        }

        return ancestor;

    },

    lastCorrectlyOrderedElement: function(arr) {

        let previous = -Infinity;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < previous) {
                break;
            }
            previous = arr[i];
        }

        return previous;
    }
};
