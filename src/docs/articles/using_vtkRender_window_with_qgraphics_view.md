---
title: "Using vtkRenderWindow with QGraphics View"
slug: using-vtkrenderwindow-with-qgraphics-view
layout: page
published_at: 2010-06-11
article: true
tags:
    - opengl
    - vtk
    - qt
    - programming
    - graphics
    - c++
    - experiment
---


We are about to begin on a project that requires us to have floating and transparent widgets over VTK render-window output. About a year back, we wanted to provide something similar to VTK Designer 2. We wanted users to have the ability to load UI (created using Qt Designer) directly on the VTK output window. At that time we were unable to come up with something satisfactory.

With the recent changes in Qt, it is now possible for us to have `vtkRenderWindow` within `QGraphicsView`. In fact we can now have `vtkRenderWindow` paint on to a `QGLWidget` `viewport` of `QGraphicsView`. That's exactly what the `vtkQtGraphicsViewRenderWindow` class allows us to do.

The class is defined as follows:
```
#ifdef Q_WS_WIN

#include "vtkWin32OpenGLRenderWindow.h"
typedef vtkWin32OpenGLRenderWindow vtkRenderWindowClass;

#endif

#ifdef Q_WS_X11

#include "vtkXOpenGLRenderWindow.h"
typedef vtkXOpenGLRenderWindow vtkRenderWindowClass;

#endif

class vtkQtGraphicsViewRenderWindow : public QGraphicsView,
public vtkRenderWindowClass
{

    Q_OBJECT

    public:

    vtkQtGraphicsViewRenderWindow(QWidget parent = 0);
    ~vtkQtGraphicsViewRenderWindow();
...

};
```

Since `vtkQtGraphicsViewRenderWindow` is a subclass of both `QGraphicsView` and `vtkRenderWindow`

- we can add any QGraphicsItem to its scene.
- we can use it as a drop-in replacement for vtkRenderWindow.

For example :
```
vtkRenderer CreateVTKPipeline()
{

    vtkRenderer renderer = vtkRenderer::New();

    // Omitted code that create a fractal terrain scene.

    return renderer;

}

int main(int argc, char argv)
{

    QApplication a(argc, argv);

    vtkRenderer renderer = CreateVTKPipeline();

    vtkQtGraphicsViewRenderWindow gView;
    gView.AddRenderer( renderer );
    gView.resize(800, 600);
    gView.show();

    QCalendarWidget calendar = new QCalendarWidget;
    calendar->setWindowOpacity(0.7);

    QGraphicsProxyWidget sceneWidget = new QGraphicsProxyWidget(0, Qt::Dialog);
    sceneWidget->setWidget(calendar);
    sceneWidget->setPos( -sceneWidget->boundingRect().topLeft() );
    sceneWidget->setFlag(QGraphicsItem::ItemIsMovable);
    sceneWidget->setCacheMode(QGraphicsItem::DeviceCoordinateCache);
    sceneWidget->setWindowTitle("Calendar Widget");

    QGraphicsScene* scene = gView.scene();
    scene->addItem(sceneWidget);

    return a.exec();

}
```
