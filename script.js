// search.js - 增强版API搜索功能
class EnhancedAPISearch {
    constructor() {
        this.apiData = this.getAllAPIData();
        this.searchIndex = this.buildSearchIndex();
        this.init();
    }

    init() {
        this.bindSearchEvents();
        this.setupURLSearch();
    }

    // 获取所有API函数数据
    getAllAPIData() {
        return [
            // ============ 窗口管理模块 (Q.Window.h) ============
            {
                id: 'CreateGraphWindow',
                name: 'CreateGraphWindow',
                description: '创建图形窗口',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-create',
                fullSignature: 'static void CreateGraphWindow(RenderWindow& Dest, int x = -1, int y = -1, int w = -1, int h = -1, string title = "QGraphWindow", uint32_t style = 7U, sf::State state = sf::State::Windowed, const sf::ContextSettings& setting = {})'
            },
            {
                id: 'DelayFps',
                name: 'DelayFps',
                description: '帧刷新窗口',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-fps',
                fullSignature: 'static void DelayFps(int fps, RenderWindow& Dest)'
            },
            {
                id: 'IsFocus',
                name: 'IsFocus',
                description: '判断当前窗口是否为焦点窗口',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-focus',
                fullSignature: 'static bool IsFocus(RenderWindow& Dest)'
            },
            {
                id: 'SetTitle',
                name: 'SetTitle',
                description: '设置窗口标题',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-title',
                fullSignature: 'static void SetTitle(RenderWindow& Dest, const String& title)'
            },
            {
                id: 'SetIcon',
                name: 'SetIcon',
                description: '从文件中设置窗口的图标',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-icon',
                fullSignature: 'static void SetIcon(RenderWindow& Dest, const String& path)'
            },
            {
                id: 'SetMouseCursorVisible',
                name: 'SetMouseCursorVisible',
                description: '设置鼠标在窗口上是否可见',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-mouse',
                fullSignature: 'static void SetMouseCursorVisible(RenderWindow& Dest, bool visible)'
            },
            {
                id: 'MoveWindow',
                name: 'MoveWindow',
                description: '移动窗口',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-move',
                fullSignature: 'static void MoveWindow(RenderWindow& Dest, int x, int y)'
            },
            {
                id: 'SetWindowSize',
                name: 'SetWindowSize',
                description: '设置窗口大小',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-size',
                fullSignature: 'static void SetWindowSize(RenderWindow& Dest, int width, int height)'
            },
            {
                id: 'GetWindowSize',
                name: 'GetWindowSize',
                description: '获取窗口大小',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-size',
                fullSignature: 'static Vector2i GetWindowSize(RenderWindow& Dest)'
            },
            {
                id: 'GetWindowPos',
                name: 'GetWindowPos',
                description: '获取窗口坐标',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-position',
                fullSignature: 'static Vector2i GetWindowPos(RenderWindow& Dest)'
            },
            {
                id: 'SetWindowMinSize',
                name: 'SetWindowMinSize',
                description: '设置窗口大小的最小值',
                category: 'window',
                url: 'window.html',
                section: 'qwindow-size',
                fullSignature: 'static void SetWindowMinSize(RenderWindow& Dest, int width, int height)'
            },

            // ============ 图形基础模块 (Q.Graph.h - 基本函数) ============
            {
                id: 'setcolor',
                name: 'setcolor',
                description: '设置绘制颜色',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-color',
                fullSignature: 'static void setcolor(Color color)'
            },
            {
                id: 'setfillcolor',
                name: 'setfillcolor',
                description: '设置填充颜色',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-color',
                fullSignature: 'static void setfillcolor(Color color)'
            },

            // ============ 直线绘制函数 (Q.Graph.h - Line) ============
            {
                id: 'line',
                name: 'line',
                description: '绘制直线',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-line',
                fullSignature: 'static void line(float x1, float y1, float x2, float y2, RenderWindow& Dest)'
            },
            {
                id: 'lineEx',
                name: 'lineEx',
                description: '绘制扩展直线',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-line',
                fullSignature: 'static void lineEx(float x, float y, float x2, float y2, int thickness, LineType type, RenderWindow& Dest)'
            },
            {
                id: 'setlinewidth',
                name: 'setlinewidth',
                description: '设置线条粗细',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-line',
                fullSignature: 'static void setlinewidth(int thickness = 1)'
            },
            {
                id: 'setlinetype',
                name: 'setlinetype',
                description: '设置线条类型',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-line',
                fullSignature: 'static void setlinetype(LineType type = LINE_SOLID)'
            },
            {
                id: 'setlinecap',
                name: 'setlinecap',
                description: '设置线头类型',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-line',
                fullSignature: 'static void setlinecap(LineCapType type = LINECAP_ROUND)'
            },

            // ============ 圆形绘制函数 (Q.Graph.h - Circle) ============
            {
                id: 'circle',
                name: 'circle',
                description: '绘制圆形',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-circle',
                fullSignature: 'static void circle(float x, float y, float radius, RenderWindow& Dest)'
            },
            {
                id: 'fillcircle',
                name: 'fillcircle',
                description: '绘制填充的圆形（带边框）',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-circle',
                fullSignature: 'static void fillcircle(float x, float y, float radius, RenderWindow& Dest)'
            },
            {
                id: 'ellipse',
                name: 'ellipse',
                description: '绘制椭圆（带边框）',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-circle',
                fullSignature: 'static void ellipse(float x, float y, float radiusX, float radiusY, RenderWindow& Dest)'
            },
            {
                id: 'fillellipse',
                name: 'fillellipse',
                description: '绘制填充的椭圆（带边框）',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-circle',
                fullSignature: 'static void fillellipse(float x, float y, float radiusX, float radiusY, RenderWindow& Dest)'
            },
            {
                id: 'fillcircle_withoutborder',
                name: 'fillcircle_withoutborder',
                description: '绘制填充无边框圆',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-circle',
                fullSignature: 'static void fillcircle_withoutborder(float x, float y, float radius, RenderWindow& Dest)'
            },
            {
                id: 'fillellipse_withoutborder',
                name: 'fillellipse_withoutborder',
                description: '绘制填充无边框椭圆',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-circle',
                fullSignature: 'static void fillellipse_withoutborder(float x, float y, float radiusX, float radiusY, RenderWindow& Dest)'
            },
            {
                id: 'arc',
                name: 'arc',
                description: '绘制圆弧',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-circle',
                fullSignature: 'static void arc(float x, float y, float radius, float startAngle, float endAngle, RenderWindow& Dest)'
            },
            {
                id: 'fillarc',
                name: 'fillarc',
                description: '绘制无边框填充圆弧',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-circle',
                fullSignature: 'static void fillarc(float x, float y, float radius, float startAngle, float endAngle, RenderWindow& Dest)'
            },

            // ============ 矩形绘制函数 (Q.Graph.h - Rectangle) ============
            {
                id: 'rectangle',
                name: 'rectangle',
                description: '绘制矩形边框',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-rectangle',
                fullSignature: 'static void rect(float x, float y, float w, float h, RenderWindow& Dest)'
            },
            {
                id: 'fillrect',
                name: 'fillrect',
                description: '绘制填充矩形（带边框）',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-rectangle',
                fullSignature: 'static void fillrect(float x, float y, float w, float h, RenderWindow& Dest)'
            },
            {
                id: 'fillrect_withoutborder',
                name: 'fillrect_withoutborder',
                description: '绘制填充无边框矩形',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-rectangle',
                fullSignature: 'static void fillrect_withoutborder(float x, float y, float w, float h, RenderWindow& Dest)'
            },
            {
                id: 'roundrect',
                name: 'roundrect',
                description: '绘制圆角矩形边框',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-rectangle',
                fullSignature: 'static void roundrect(float x, float y, float w, float h, float radius, RenderWindow& Dest)'
            },
            {
                id: 'fillroundrect',
                name: 'fillroundrect',
                description: '绘制填充圆角矩形（带边框）',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-rectangle',
                fullSignature: 'static void fillroundrect(float x, float y, float w, float h, float radius, RenderWindow& Dest)'
            },
            {
                id: 'fillroundrect_withoutborder',
                name: 'fillroundrect_withoutborder',
                description: '绘制填充无边框圆角矩形',
                category: 'graphics',
                url: 'graphics-basic.html',
                section: 'qgraph-rectangle',
                fullSignature: 'static void fillroundrect_withoutborder(float x, float y, float w, float h, float radius, RenderWindow& Dest)'
            },

            // ============ 图片处理模块 (Q.Graph.h - QImage) ============
            {
                id: 'newimage1',
                name: 'newimage',
                description: '从文件创建图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-basic',
                fullSignature: 'static bool newimage(IMAGE& img, const string& filename, int x = 0, int y = 0, int w = 0, int h = 0)'
            },
            {
                id: 'newimage2',
                name: 'newimage',
                description: '从窗口上获取图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-basic',
                fullSignature: 'static bool newimage(RenderWindow& window, IMAGE& img, int x, int y, int w, int h)'
            },
            {
                id: 'newimage3',
                name: 'newimage',
                description: '从另一图像上获取图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-basic',
                fullSignature: 'static bool newimage(IMAGE& dest, IMAGE& src, int x = -1, int y = -1, int w = -1, int h = -1)'
            },
            {
                id: 'Cutimage',
                name: 'Cutimage',
                description: '裁剪图片',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-process',
                fullSignature: 'static bool Cutimage(IMAGE& img, int x, int y, int w, int h)'
            },
            {
                id: 'IsSmoothImage',
                name: 'IsSmoothImage',
                description: '启用平滑图片',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-process',
                fullSignature: 'static void IsSmoothImage(IMAGE& img, bool smooth)'
            },
            {
                id: 'IsRepeatedImage',
                name: 'IsRepeatedImage',
                description: '是否平铺图片',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-process',
                fullSignature: 'static void IsRepeatedImage(IMAGE& img, bool repeated)'
            },
            {
                id: 'SetImageColor',
                name: 'SetImageColor',
                description: '应用图像颜色滤镜',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-process',
                fullSignature: 'static void SetImageColor(IMAGE& img, Color color)'
            },
            {
                id: 'UpdateImage',
                name: 'UpdateImage',
                description: '更新图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-process',
                fullSignature: 'static void UpdateImage(IMAGE& img, IMAGE& dest)'
            },
            {
                id: 'AlphaImage',
                name: 'AlphaImage',
                description: '半透明化图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-process',
                fullSignature: 'static void AlphaImage(IMAGE& img, int alpha)'
            },

            // ============ 图片绘制函数 ============
            {
                id: 'PutImage1',
                name: 'PutImage',
                description: '绘制图像到窗口',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-draw',
                fullSignature: 'static void PutImage(IMAGE& img, float x, float y, RenderWindow& Dest, float CenterX = 0.0, float CenterY = 0.0)'
            },
            {
                id: 'PutImage2',
                name: 'PutImage',
                description: '绘制图像到另一图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-draw',
                fullSignature: 'static void PutImage(IMAGE& dest, IMAGE& src, float x, float y, float CenterX = 0.0, float CenterY = 0.0)'
            },
            {
                id: 'PutRoteImage1',
                name: 'PutRoteImage',
                description: '绘制旋转图像到窗口',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-rotate',
                fullSignature: 'static void PutRoteImage(IMAGE& img, float x, float y, float angle, RenderWindow& Dest, float CenterX = 0.0, float CenterY = 0.0)'
            },
            {
                id: 'PutRoteImage2',
                name: 'PutRoteImage',
                description: '绘制旋转图像到另一图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-rotate',
                fullSignature: 'static void PutRoteImage(IMAGE& dest, IMAGE& img, float x, float y, float angle, float CenterX = 0.0, float CenterY = 0.0)'
            },
            {
                id: 'PutScaleImage1',
                name: 'PutScaleImage',
                description: '绘制缩放图像到窗口',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-scale',
                fullSignature: 'static void PutScaleImage(IMAGE& img, float x, float y, float scaleX, float scaleY, RenderWindow& Dest, float CenterX = 0.0, float CenterY = 0.0)'
            },
            {
                id: 'PutScaleImage2',
                name: 'PutScaleImage',
                description: '绘制缩放图像到另一图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-scale',
                fullSignature: 'static void PutScaleImage(IMAGE& dest, IMAGE& img, float x, float y, float scaleX, float scaleY, float CenterX = 0.0, float CenterY = 0.0)'
            },
            {
                id: 'PutRoteScaleImage1',
                name: 'PutRoteScaleImage',
                description: '绘制旋转缩放图像到窗口',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-scale',
                fullSignature: 'static void PutRoteScaleImage(IMAGE& img, float x, float y, float angle, float scaleX, float scaleY, RenderWindow& Dest, float CenterX = 0.0, float CenterY = 0.0)'
            },
            {
                id: 'PutRoteScaleImage2',
                name: 'PutRoteScaleImage',
                description: '绘制旋转缩放图像到另一图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-scale',
                fullSignature: 'static void PutRoteScaleImage(IMAGE& dest, IMAGE& img, float x, float y, float angle, float scaleX, float scaleY, float CenterX = 0.0, float CenterY = 0.0)'
            },

            // ============ 图片信息函数 ============
            {
                id: 'GetWidth',
                name: 'GetWidth',
                description: '获取图像的宽',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-info',
                fullSignature: 'static int GetWidth(IMAGE& img)'
            },
            {
                id: 'GetHeight',
                name: 'GetHeight',
                description: '获取图像的高',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-info',
                fullSignature: 'static int GetHeight(IMAGE& img)'
            },
            {
                id: 'ClearImage',
                name: 'ClearImage',
                description: '清理图像为纯色背景',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimage-process',
                fullSignature: 'static void ClearImage(IMAGE& image, Color backcolor)'
            },

            // ============ 图片扩展处理 (QImageEx) ============
            {
                id: 'ZoomImage1',
                name: 'ZoomImage',
                description: '缩放图像（指定目标宽高）',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimageex',
                fullSignature: 'static void ZoomImage(IMAGE& img, int scaleW, int scaleH)'
            },
            {
                id: 'ZoomImage2',
                name: 'ZoomImage',
                description: '缩放图像（指定缩放倍数）',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimageex',
                fullSignature: 'static void ZoomImage(float scaleW, float scaleH, IMAGE& img)'
            },
            {
                id: 'BlurImage',
                name: 'BlurImage',
                description: '高斯模糊图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimageex',
                fullSignature: 'static void BlurImage(IMAGE& img, double sigma, int downscale)'
            },
            {
                id: 'FogImage',
                name: 'FogImage',
                description: '雾化图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimageex',
                fullSignature: 'static void FogImage(IMAGE& img, double sigma, int downscale, int alpha)'
            },
            {
                id: 'FeatherImage',
                name: 'FeatherImage',
                description: '羽化图片',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimageex',
                fullSignature: 'static void FeatherImage(IMAGE& img, float strength, int downscale, int mode = 1)'
            },
            {
                id: 'BlackWImage',
                name: 'BlackWImage',
                description: '黑白化图像',
                category: 'graphics',
                url: 'graphics-image.html',
                section: 'qimageex',
                fullSignature: 'static void BlackWImage(IMAGE& img, float strenth, int downscale)'
            },

            // ============ 文字处理模块 (QText) ============
            {
                id: 'Xyprintf1',
                name: 'Xyprintf',
                description: '在指定位置绘制文本',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-basic',
                fullSignature: 'static void Xyprintf(float x, float y, string str, RenderWindow& Dest)'
            },
            {
                id: 'Xyprintf2',
                name: 'Xyprintf',
                description: '在指定位置绘制彩色文本',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-basic',
                fullSignature: 'static void Xyprintf(float x, float y, string str, Color color, RenderWindow& Dest)'
            },
            {
                id: 'Xyprintf3',
                name: 'Xyprintf',
                description: '在指定位置绘制彩色、指定大小的文本',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-basic',
                fullSignature: 'static void Xyprintf(float x, float y, string str, Color color, int size, RenderWindow& Dest)'
            },

            // ============ 文字配置函数 ============
            {
                id: 'SetFontColor',
                name: 'SetFontColor',
                description: '设置绘制文本的颜色',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-font',
                fullSignature: 'static void SetFontColor(Color color)'
            },
            {
                id: 'SetFontSize',
                name: 'SetFontSize',
                description: '设置绘制文本的大小',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-font',
                fullSignature: 'static void SetFontSize(int size)'
            },
            {
                id: 'SetFontConfig',
                name: 'SetFontConfig',
                description: '设置绘制文本的配置',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-font',
                fullSignature: 'static void SetFontConfig(Color color, int size)'
            },

            // ============ 字体设置函数 ============
            {
                id: 'SetFont1',
                name: 'SetFont',
                description: '设置字体（Font类型）',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-font',
                fullSignature: 'static void SetFont(Font font)'
            },
            {
                id: 'SetFont2',
                name: 'SetFont',
                description: '设置字体（Font类型，带颜色和大小）',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-font',
                fullSignature: 'static void SetFont(Font font, Color color, int size)'
            },
            {
                id: 'SetFont3',
                name: 'SetFont',
                description: '从文件中设置字体',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-font',
                fullSignature: 'static void SetFont(string filename)'
            },
            {
                id: 'SetFont4',
                name: 'SetFont',
                description: '从文件中设置字体（带颜色和大小）',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-font',
                fullSignature: 'static void SetFont(string filename, Color color, int size)'
            },
            {
                id: 'SetFontAdjust',
                name: 'SetFontAdjust',
                description: '设置文本对齐方式',
                category: 'graphics',
                url: 'graphics-text.html',
                section: 'qtext-font',
                fullSignature: 'static void SetFontAdjust(FontAdjustType horizontal, FontAdjustType vertical)'
            },

            // ============ 颜色处理模块 (Q.Color.h) ============
            {
                id: 'GrayColor',
                name: 'GrayColor',
                description: '灰度化颜色',
                category: 'color',
                url: 'color.html',
                section: 'qcolor-process',
                fullSignature: 'static Color GrayColor(const Color& color, float percent)'
            },
            {
                id: 'DarkColor',
                name: 'DarkColor',
                description: '暗化颜色',
                category: 'color',
                url: 'color.html',
                section: 'qcolor-process',
                fullSignature: 'static Color DarkColor(const Color& color, float percent)'
            },
            {
                id: 'LightColor',
                name: 'LightColor',
                description: '亮化颜色',
                category: 'color',
                url: 'color.html',
                section: 'qcolor-process',
                fullSignature: 'static Color LightColor(const Color& color, float percent)'
            },
            {
                id: 'AlphaColor',
                name: 'AlphaColor',
                description: '透明化颜色',
                category: 'color',
                url: 'color.html',
                section: 'qcolor-process',
                fullSignature: 'static Color AlphaColor(const Color& color, uint8_t alpha)'
            },
            {
                id: 'IsDarkColor',
                name: 'IsDarkColor',
                description: '判断是否为深色',
                category: 'color',
                url: 'color.html',
                section: 'qcolor-check',
                fullSignature: 'static bool IsDarkColor(const Color& color)'
            },
            {
                id: 'IsColorSame',
                name: 'IsColorSame',
                description: '判断颜色是否相似或者相同',
                category: 'color',
                url: 'color.html',
                section: 'qcolor-check',
                fullSignature: 'static bool IsColorSame(const Color& colorA, const Color& colorB, bool UseAlpha = false, bool isExact = false, int VagueValue = 10)'
            },
            {
                id: 'AdjustColorBright',
                name: 'AdjustColorBright',
                description: '调整颜色亮度',
                category: 'color',
                url: 'color.html',
                section: 'qcolor-process',
                fullSignature: 'static Color AdjustColorBright(const Color& color, int brightness)'
            },

            // ============ 消息处理基础模块 (Q.Msg.h) ============
            {
                id: 'UpdateMsg',
                name: 'UpdateMsg',
                description: '更新窗口消息',
                category: 'messages',
                url: 'messages-basic.html',
                section: 'qmsg-basic',
                fullSignature: 'static void UpdateMsg(RenderWindow& Dest)'
            },
            {
                id: 'IsClose',
                name: 'IsClose',
                description: '判断当前窗口的关闭消息',
                category: 'messages',
                url: 'messages-basic.html',
                section: 'qmsg-basic',
                fullSignature: 'static bool IsClose()'
            },
            {
                id: 'ResetCloseMsg',
                name: 'ResetCloseMsg',
                description: '重置关闭消息，用于多窗口',
                category: 'messages',
                url: 'messages-basic.html',
                section: 'qmsg-basic',
                fullSignature: 'static void ResetCloseMsg()'
            },
            {
                id: 'SetUpdateId',
                name: 'SetUpdateId',
                description: '设置全局默认的消息ID',
                category: 'messages',
                url: 'messages-basic.html',
                section: 'qmsg-basic',
                fullSignature: 'static void SetUpdateId(int id)'
            },
            {
                id: 'SetSleepTime',
                name: 'SetSleepTime',
                description: '设置消息睡眠时间',
                category: 'messages',
                url: 'messages-basic.html',
                section: 'qmsg-basic',
                fullSignature: 'static void SetSleepTime(int time)'
            },
            {
                id: 'ClearMsg',
                name: 'ClearMsg',
                description: '清理消息缓冲区',
                category: 'messages',
                url: 'messages-basic.html',
                section: 'qmsg-basic',
                fullSignature: 'static void ClearMsg(int id = -1)'
            },

            // ============ 鼠标消息模块 (MouseMsg) ============
            {
                id: 'GetMousePosWindow',
                name: 'GetMousePosWindow',
                description: '获取鼠标在指定窗口上的位置',
                category: 'messages',
                url: 'messages-mouse.html',
                section: 'qmsg-mouse',
                fullSignature: 'static Vector2i GetMousePosWindow(RenderWindow& window)'
            },
            {
                id: 'GetMousePosScreen',
                name: 'GetMousePosScreen',
                description: '获取鼠标在屏幕上的位置',
                category: 'messages',
                url: 'messages-mouse.html',
                section: 'qmsg-mouse',
                fullSignature: 'static Vector2i GetMousePosScreen()'
            },
            {
                id: 'getMouseWheel',
                name: 'getMouseWheel',
                description: '获取鼠标的滚轮值',
                category: 'messages',
                url: 'messages-mouse.html',
                section: 'qmsg-mouse',
                fullSignature: 'static int getMouseWheel()'
            },
            {
                id: 'IsMouseDown',
                name: 'IsMouseDown',
                description: '判断当前鼠标是否被按下',
                category: 'messages',
                url: 'messages-mouse.html',
                section: 'qmsg-mouse',
                fullSignature: 'static bool IsMouseDown(RenderWindow& Dest, Mouse::Button button, int id = -1)'
            },
            {
                id: 'IsMouseIn',
                name: 'IsMouseIn',
                description: '判断鼠标是否在窗口的指定区域内',
                category: 'messages',
                url: 'messages-mouse.html',
                section: 'qmsg-mouse',
                fullSignature: 'static bool IsMouseIn(int x, int y, int w, int h, RenderWindow& Dest, int id = -1)'
            },
            {
                id: 'IsMousePress',
                name: 'IsMousePress',
                description: '判断当前鼠标是否处于按下状态',
                category: 'messages',
                url: 'messages-mouse.html',
                section: 'qmsg-mouse',
                fullSignature: 'static bool IsMousePress(RenderWindow& Dest, Mouse::Button button, int id = -1)'
            },
            {
                id: 'IsWheel',
                name: 'IsWheel',
                description: '判断当前鼠标是否滚轮',
                category: 'messages',
                url: 'messages-mouse.html',
                section: 'qmsg-mouse',
                fullSignature: 'static bool IsWheel()'
            },
            {
                id: 'IsMouseMove',
                name: 'IsMouseMove',
                description: '判断当前鼠标是否移动',
                category: 'messages',
                url: 'messages-mouse.html',
                section: 'qmsg-mouse',
                fullSignature: 'static bool IsMouseMove(int id = -1)'
            },
            {
                id: 'GetTouchNum',
                name: 'GetTouchNum',
                description: '获取当前触摸点数',
                category: 'messages',
                url: 'messages-mouse.html',
                section: 'qmsg-mouse',
                fullSignature: 'static int GetTouchNum()'
            },

            // ============ 键盘消息模块 (KeyMsg) ============
            {
                id: 'IsKeyDown',
                name: 'IsKeyDown',
                description: '判断当前键盘的一个按键是否被按下',
                category: 'messages',
                url: 'messages-keyboard.html',
                section: 'qmsg-keyboard',
                fullSignature: 'static bool IsKeyDown(RenderWindow& Dest, string key = "NULL", int id = -1)'
            },
            {
                id: 'IsKeyUp',
                name: 'IsKeyUp',
                description: '判断当前键盘的一个按键是否抬起',
                category: 'messages',
                url: 'messages-keyboard.html',
                section: 'qmsg-keyboard',
                fullSignature: 'static bool IsKeyUp(RenderWindow& Dest, string key = "NULL", int id = -1)'
            },
            {
                id: 'GetKeyList',
                name: 'GetKeyList',
                description: '获取键盘按下的键的列表',
                category: 'messages',
                url: 'messages-keyboard.html',
                section: 'qmsg-keyboard',
                fullSignature: 'static vector<string> GetKeyList(int id = -1)'
            },
            {
                id: 'Keystate',
                name: 'Keystate',
                description: '判断虚拟键码对应的按键是否被按下',
                category: 'messages',
                url: 'messages-keyboard.html',
                section: 'qmsg-keyboard',
                fullSignature: 'static bool Keystate(int VK)'
            },

            // ============ 复合函数模块 (Composite) ============
            {
                id: 'GetRectWheel',
                name: 'GetRectWheel',
                description: '获取一个区域内鼠标的滚轮值',
                category: 'messages',
                url: 'messages-composite.html',
                section: 'qmsg-composite',
                fullSignature: 'static int GetRectWheel(RenderWindow& Dest, int x, int y, int w, int h, int id = -1)'
            },
            {
                id: 'IsMouseInRectDown',
                name: 'IsMouseInRectDown',
                description: '判断当前鼠标是否在一个区域内并且处于按下状态',
                category: 'messages',
                url: 'messages-composite.html',
                section: 'qmsg-composite',
                fullSignature: 'static bool IsMouseInRectDown(RenderWindow& Dest, Mouse::Button button, int x, int y, int w, int h, int id = -1)'
            },
            {
                id: 'GetKeyPressNum',
                name: 'GetKeyPressNum',
                description: '获取键盘按下的数字键',
                category: 'messages',
                url: 'messages-composite.html',
                section: 'qmsg-composite',
                fullSignature: 'static int GetKeyPressNum(RenderWindow& Dest, int id = -1)'
            },
            {
                id: 'GetKeyPressString',
                name: 'GetKeyPressString',
                description: '获取键盘按下的键的字符串',
                category: 'messages',
                url: 'messages-composite.html',
                section: 'qmsg-composite',
                fullSignature: 'static string GetKeyPressString(RenderWindow& Dest, int id = -1)'
            },
            {
                id: 'UpdateWheel',
                name: 'UpdateWheel',
                description: '更新鼠标滚轮值',
                category: 'messages',
                url: 'messages-composite.html',
                section: 'qmsg-composite',
                fullSignature: 'static void UpdateWheel(int& wheel, int& tempspeed, const int speed, const int max, const int min)'
            },
            {
                id: 'UpdatePress',
                name: 'UpdatePress',
                description: '处理键盘输入的字符串',
                category: 'messages',
                url: 'messages-composite.html',
                section: 'qmsg-composite',
                fullSignature: 'static void UpdatePress(string& str, bool BanAcl = false, int id = -1)'
            },

            // ============ 系统函数模块 (Q.System.h) ============
            {
                id: 'GetScreenSize',
                name: 'GetScreenSize',
                description: '获取屏幕大小',
                category: 'system',
                url: 'system.html',
                section: 'qsystem-info',
                fullSignature: 'static POINT GetScreenSize()'
            },
            {
                id: 'IsDarkMode',
                name: 'IsDarkMode',
                description: '判断当前系统是否为深色模式',
                category: 'system',
                url: 'system.html',
                section: 'qsystem-info',
                fullSignature: 'static bool IsDarkMode()'
            },
            {
                id: 'IsWindows11',
                name: 'IsWindows11',
                description: '判断当前版本是否为Windows11',
                category: 'system',
                url: 'system.html',
                section: 'qsystem-info',
                fullSignature: 'static bool IsWindows11()'
            },
            {
                id: 'RoundWindowDWM',
                name: 'RoundWindowDWM',
                description: '圆角化窗口，仅在Windows11中有效',
                category: 'system',
                url: 'system.html',
                section: 'qsystem-window',
                fullSignature: 'static void RoundWindowDWM(HWND hwnd, int type)'
            },
            {
                id: 'SetWindowBorder',
                name: 'SetWindowBorder',
                description: '设置窗口边框的颜色',
                category: 'system',
                url: 'system.html',
                section: 'qsystem-window',
                fullSignature: 'static void SetWindowBorder(HWND hwnd, COLORREF color)'
            },
            {
                id: 'GetTimeNow',
                name: 'GetTimeNow',
                description: '获取当前时间的字符串',
                category: 'system',
                url: 'system.html',
                section: 'qsystem-time',
                fullSignature: 'static std::string GetTimeNow()'
            },
            {
                id: 'GetTimeNowEx',
                name: 'GetTimeNowEx',
                description: '获取指定格式的当前时间的字符串',
                category: 'system',
                url: 'system.html',
                section: 'qsystem-time',
                fullSignature: 'static std::string GetTimeNowEx(bool hour12 = false, bool addcircle = true, bool year = false, bool month = false, bool day = false, bool hour = true, bool min = true, bool sec = true)'
            },
            {
                id: 'HideTaskBar',
                name: 'HideTaskBar',
                description: '隐藏任务栏',
                category: 'system',
                url: 'system.html',
                section: 'qsystem-control',
                fullSignature: 'static void HideTaskBar(bool hide)'
            },
            {
                id: 'GetRand',
                name: 'GetRand',
                description: '获取随机值',
                category: 'system',
                url: 'system.html',
                section: 'qsystem-control',
                fullSignature: 'static int GetRand(int min, int max)'
            }
        ];
    }

    buildSearchIndex() {
        return this.apiData.map(item => ({
            text: `${item.name.toLowerCase()} ${item.description.toLowerCase()} ${item.category.toLowerCase()} ${item.fullSignature.toLowerCase()}`,
            data: item
        }));
    }

    bindSearchEvents() {
        const searchInput = document.getElementById('searchInput');
        const searchSuggestions = document.getElementById('searchSuggestions');

        if (searchInput && searchSuggestions) {
            // 输入时搜索
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            // 点击外部隐藏建议
            document.addEventListener('click', (e) => {
                if (!searchInput.contains(e.target) && !searchSuggestions.contains(e.target)) {
                    searchSuggestions.style.display = 'none';
                }
            });

            // 键盘导航
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigateSuggestions(1);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigateSuggestions(-1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.performSearch();
                } else if (e.key === 'Escape') {
                    searchSuggestions.style.display = 'none';
                }
            });
        }
    }

    setupURLSearch() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchParam = urlParams.get('search');
        if (searchParam) {
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.value = searchParam;
                this.handleSearch(searchParam);
            }
        }
    }

    handleSearch(query) {
        if (!query || query.trim() === '') {
            this.hideSuggestions();
            return;
        }

        const results = this.searchAPI(query.trim());
        this.showSuggestions(results);
    }

    searchAPI(query) {
        const searchTerm = query.toLowerCase().trim();
        const results = [];

        for (const item of this.searchIndex) {
            if (item.text.includes(searchTerm)) {
                // 计算匹配度
                const nameMatch = item.data.name.toLowerCase().includes(searchTerm) ? 2 : 0;
                const descMatch = item.data.description.toLowerCase().includes(searchTerm) ? 1 : 0;
                const sigMatch = item.data.fullSignature.toLowerCase().includes(searchTerm) ? 0.5 : 0;

                results.push({
                    ...item.data,
                    score: nameMatch + descMatch + sigMatch
                });
            }
        }

        // 按分数排序
        return results.sort((a, b) => b.score - a.score).slice(0, 8);
    }

    showSuggestions(results) {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (!suggestionsContainer) return;

        if (results.length === 0) {
            suggestionsContainer.innerHTML = `
                <div class="search-no-results">
                    <i class="fas fa-search"></i>
                    <span>未找到相关函数</span>
                </div>
            `;
            suggestionsContainer.style.display = 'block';
            return;
        }

        suggestionsContainer.innerHTML = results.map((result, index) => `
            <a href="#" class="search-suggestion-item ${index === 0 ? 'selected' : ''}" 
               data-id="${result.id}"
               data-url="${result.url}"
               data-section="${result.section}"
               data-function="${result.name}">
                <div class="suggestion-header">
                    <div class="suggestion-name">${this.highlightText(result.name, document.getElementById('searchInput')?.value)}</div>
                    <div class="suggestion-category">${this.getCategoryIcon(result.category)} ${result.category}</div>
                </div>
                <div class="suggestion-description">${result.description}</div>
                <div class="suggestion-signature">${result.fullSignature}</div>
            </a>
        `).join('');

        suggestionsContainer.style.display = 'block';

        // 为每个建议项添加事件
        const items = suggestionsContainer.getElementsByClassName('search-suggestion-item');
        Array.from(items).forEach((item, index) => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.navigateToFunction(item);
            });

            item.addEventListener('mouseenter', () => {
                this.setSelectedSuggestion(index);
            });
        });
    }

    navigateSuggestions(direction) {
        const items = document.querySelectorAll('.search-suggestion-item');
        if (items.length === 0) return;

        const selected = document.querySelector('.search-suggestion-item.selected');
        let currentIndex = 0;

        if (selected) {
            currentIndex = Array.from(items).indexOf(selected);
            selected.classList.remove('selected');
        }

        let newIndex = currentIndex + direction;
        if (newIndex < 0) newIndex = items.length - 1;
        if (newIndex >= items.length) newIndex = 0;

        items[newIndex].classList.add('selected');

        // 滚动到选中的项
        items[newIndex].scrollIntoView({ block: 'nearest' });
    }

    setSelectedSuggestion(index) {
        const items = document.querySelectorAll('.search-suggestion-item');
        items.forEach(item => item.classList.remove('selected'));
        if (items[index]) {
            items[index].classList.add('selected');
        }
    }

    navigateToFunction(item) {
        const url = item.getAttribute('data-url');
        const section = item.getAttribute('data-section');
        const funcName = item.getAttribute('data-function');

        if (url && section) {
            // 检查是否在同一页面
            if (window.location.pathname.endsWith(url)) {
                // 在同一页面，直接滚动到函数位置
                this.scrollToFunction(section, funcName);
            } else {
                // 在不同页面，跳转并传递参数
                window.location.href = `${url}?search=${encodeURIComponent(funcName)}#${section}`;
            }
        }
    }

    scrollToFunction(sectionId, functionName) {
        const element = document.getElementById(sectionId);
        if (element) {
            // 添加高亮效果
            element.classList.add('search-highlight');

            // 滚动到元素位置
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });

            // 移除高亮效果
            setTimeout(() => {
                element.classList.remove('search-highlight');
            }, 2000);
        }
    }

    performSearch() {
        const input = document.getElementById('searchInput');
        const query = input.value.trim();

        if (query) {
            const selected = document.querySelector('.search-suggestion-item.selected');
            if (selected) {
                this.navigateToFunction(selected);
            } else {
                const results = this.searchAPI(query);
                if (results.length > 0) {
                    this.navigateToFunction(document.querySelector('.search-suggestion-item'));
                }
            }
        }
    }

    hideSuggestions() {
        const suggestionsContainer = document.getElementById('searchSuggestions');
        if (suggestionsContainer) {
            suggestionsContainer.style.display = 'none';
        }
    }

    highlightText(text, highlight) {
        if (!highlight || !text) return text;

        const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
        return text.replace(regex, '<span class="highlight">$1</span>');
    }

    getCategoryIcon(category) {
        const icons = {
            'window': '<i class="fas fa-window-maximize"></i>',
            'graphics': '<i class="fas fa-paint-brush"></i>',
            'messages': '<i class="fas fa-comments"></i>',
            'system': '<i class="fas fa-cogs"></i>'
        };
        return icons[category] || '<i class="fas fa-code"></i>';
    }
}

// 全局函数
function searchAPI(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        window.enhancedSearch?.performSearch();
    } else {
        window.enhancedSearch?.handleSearch(event.target.value);
    }
}

function showSuggestions() {
    window.enhancedSearch?.handleSearch(document.getElementById('searchInput').value);
}

function hideSuggestions() {
    setTimeout(() => {
        window.enhancedSearch?.hideSuggestions();
    }, 200);
}

function performSearch() {
    window.enhancedSearch?.performSearch();
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedSearch = new EnhancedAPISearch();

    // 处理页面内的跳转
    const hash = window.location.hash;
    if (hash) {
        const element = document.querySelector(hash);
        if (element) {
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth' });
                element.classList.add('search-highlight');

                setTimeout(() => {
                    element.classList.remove('search-highlight');
                }, 2000);
            }, 100);
        }
    }

    // 处理URL中的搜索参数
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get('search');
    if (searchParam) {
        const input = document.getElementById('searchInput');
        if (input) {
            input.value = searchParam;
        }
    }
});