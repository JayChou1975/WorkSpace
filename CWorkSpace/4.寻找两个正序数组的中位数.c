/*
 * @lc app=leetcode.cn id=4 lang=c
 *
 * [4] 寻找两个正序数组的中位数
 */

// @lc code=start


double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size)
{
    int p,q,cur;
    p=0;
    q=0;
    cur=0;
    int totalSize=nums1Size+nums2Size;

    if(1==totalSize)
        return nums1Size==0?nums2[0]:nums1[0];

    int temp[totalSize];
    while(p<nums1Size&&q<nums2Size)
    {
        if(p<nums1Size&&q<nums2Size&&nums1[p]<=nums2[q])
            temp[cur++]=nums1[p++];
        else if(p<nums1Size&&q<nums2Size&&nums1[p]>nums2[q])   
            temp[cur++]=nums2[q++];
    }
    if(p==nums1Size)
        for(int i=q;i<nums2Size;i++,cur++)
            temp[cur]=nums2[i];
    else if(q==nums2Size)
        for(int i=p;i<nums1Size;i++,cur++)
            temp[cur]=nums1[i];
          
    int totalSizeCopy=totalSize;
    if(totalSizeCopy%2==0)
        return (double)(temp[totalSize/2]+temp[(totalSize/2)-1])/2;
    else  if(totalSizeCopy%2==1)
        return temp[(totalSize-1)/2];

   return -1;   
}
// @lc code=end

