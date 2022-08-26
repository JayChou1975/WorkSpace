/*
 * @lc app=leetcode.cn id=11 lang=c
 *
 * [11] 盛最多水的容器
 */

// @lc code=start


int maxArea(int* height, int heightSize)
{
    if(2==heightSize)
        return height[0]<height[1]?height[0]:height[1];

    int i,j,max;
    i=0;
    j=heightSize-1;
    max=0;
    for(i,j;i<j;)
    {
        if(height[i+1] <=height[i] && height[j-1] < height[j] && i<j)
            i++;
        else if(height[i+1] >height[i] && height[j-1] < height[j] && i<j)
        {
            int m=(j-i)*(height[i+1]<height[j]?height[i+1]:height[j]) < (j-i+1)*(height[i]<height[j]?height[i]:height[j]) ? (j-i)*(height[i+1]<height[j]?height[i+1]:height[j]) : (j-i+1)*(height[i]<height[j]?height[i]:height[j]);
            max=max>m?max:m;
            i++;
        }
        else if(height[i+1] <=height[i] && height[j-1] > height[j] && i<j)
        {
            int m=(j-i)*(height[i-1]<height[i]?height[j-1]:height[i]) < (j-i+1)*(height[i]<height[j]?height[i]:height[j]) ? (j-i)*(height[i-1]<height[i]?height[j-1]:height[i]) : (j-i+1)*(height[i]<height[j]?height[i]:height[j]);
            max=max>m?max:m;
            j--;
        }
        else if(height[i+1] >height[i] && height[j-1] > height[j] && i<j)
        {
            int m1=(j-i)*(height[i+1]<height[j]?height[i+1]:height[j]) < (j-i+1)*(height[i]<height[j]?height[i]:height[j]) ? (j-i)*(height[i+1]<height[j]?height[i+1]:height[j]) : (j-i+1)*(height[i]<height[j]?height[i]:height[j]);
            int m2=(j-i)*(height[i-1]<height[i]?height[j-1]:height[i]) < (j-i+1)*(height[i]<height[j]?height[i]:height[j]) ? (j-i)*(height[i-1]<height[i]?height[j-1]:height[i]) : (j-i+1)*(height[i]<height[j]?height[i]:height[j]);
            if(m1>m2)
            {
                i++;
                max=m1;
            }
            else
            {
                j--;
                max=m2;
            }
        }
        
    }
    return max;
}
// @lc code=end

