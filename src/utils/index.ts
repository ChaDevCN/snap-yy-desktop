import cv from '@techstark/opencv-js';
export const extractTextRegionsFromImage = (
  url: string,
  cb: (images: string[]) => void
) => {
  const img = new Image();
  img.src = url;
  img.onload = () => {
    const src = cv.imread(img);
    const gray = new cv.Mat();

    // 1. 转为灰度图像
    cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);

    // 2. 二值化处理（提取非白色内容）
    const binary = new cv.Mat();
    cv.threshold(gray, binary, 200, 255, cv.THRESH_BINARY_INV);

    // 3. 水平投影统计像素值
    const horizontalProjection = new Array(binary.rows).fill(0);
    for (let row = 0; row < binary.rows; row++) {
      for (let col = 0; col < binary.cols; col++) {
        horizontalProjection[row] += binary.ucharPtr(row, col)[0];
      }
    }

    // 4. 找到每一行的起止范围
    const rowRanges: [number, number][] = [];
    const MIN_ROW_PIXEL = 100; // 设置每行的最小像素值阈值
    let inTextRegion = false;
    let startRow = 0;

    for (let row = 0; row < horizontalProjection.length; row++) {
      if (horizontalProjection[row] > MIN_ROW_PIXEL && !inTextRegion) {
        inTextRegion = true;
        startRow = row;
      } else if (horizontalProjection[row] <= MIN_ROW_PIXEL && inTextRegion) {
        inTextRegion = false;
        rowRanges.push([startRow, row]);
      }
    }

    if (rowRanges.length === 0) {
      alert('未能识别任何行，请检查图片内容或调整阈值！');
      return;
    }

    // 5. 按行切割并存入结果
    const slicedImages: string[] = [];
    for (const [startRow, endRow] of rowRanges) {
      const rect = new cv.Rect(0, startRow, src.cols, endRow - startRow);
      const roi = src.roi(rect);

      // 将裁剪结果转为 Base64
      const canvas = document.createElement('canvas');
      canvas.width = roi.cols;
      canvas.height = roi.rows;
      cv.imshow(canvas, roi);
      slicedImages.push(canvas.toDataURL('image/png'));

      // 清理内存
      roi.delete();
    }
    if (cb) {
      cb(slicedImages);
    }
    // 清理内存
    src.delete();
    gray.delete();
    binary.delete();
  };
};
