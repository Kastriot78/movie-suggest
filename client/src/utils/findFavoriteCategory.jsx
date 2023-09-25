export function findMostFrequentCategory(items) {
    // Count the occurrences of each category
    const categoryCounts = items.reduce((counts, item) => {
        const category = item.category;
        counts[category] = (counts[category] || 0) + 1;
        return counts;
    }, {});

    // Find the category with the highest count
    let maxCategory = null;
    let maxCount = 0;

    for (const category in categoryCounts) {
        if (categoryCounts[category] > maxCount) {
            maxCategory = category;
            maxCount = categoryCounts[category];
        }
    }

    return maxCategory;
}
