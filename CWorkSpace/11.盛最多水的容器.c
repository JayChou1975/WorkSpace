/*
 * @lc app=leetcode.cn id=11 lang=c
 *
 * [11] 盛最多水的容器
 */

// @lc code=start

int maxArea(int *height, int heightSize)
{
    int max, min;
    if (2 == heightSize)
    {
        min = height[0] < height[1] ? height[0] : height[1];
        max = min;
    }
    else
    {
        int i = 0;
        int j = heightSize - 1;
        min = height[i] < height[j] ? height[i] : height[j];
        max = min * (heightSize - 1);
        for (i; i < j;)
        {
            while (height[i + 1] < height[i] && i < j)
                i++;
            min = height[i + 1] < height[j] ? height[i + 1] : height[j];
            max = max > (min * (j - i + 1)) ? max : (min * (j - i + 1));
        }
        i = 0;
        j = heightSize - 1;
        min = height[i] < height[j] ? height[i] : height[j];

        for (j; i < j;)
        {
            while (height[j - 1] < height[j] && i < j)
                j--;
            min = height[j - 1] < height[i] ? height[j - 1] : height[i];
            max = max > (min * (j - i + 1)) ? max : (min * (j - i + 1));
        }
    }
    return max;
}
// @lc code=end
