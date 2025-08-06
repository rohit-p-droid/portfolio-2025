export function detectTextType(text: string): string {
    const htmlPattern = /<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)/i;
    const markdownPattern = /(^#{1,6}\s)|(\*\*.*\*\*)|(\*.*\*)|(\[.*\]\(.*\))|(```[\s\S]*?```)/m;

    if (htmlPattern.test(text)) {
        return 'html';
    }
    if (markdownPattern.test(text)) {
        return 'markdown';
    }
    return 'other';
}