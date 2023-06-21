import pandas as pd
from PIL import Image
import drawSvg as draw
import random


smoke_colors = ["#a9bad4", "#d0d0ce", "#d1e0f7"]

colors = ["#801100", "#B62203", "#D73502", "#FC6400", "#FF7500", "#FAC000"]

img = draw.Drawing(512, 216, origin=(0,0), displayInline=False)

dim = 64

def draw_pixel(img, x, y, color):
    # Draw an irregular polygon
    img.append(
        draw.Lines(
            8*x, 8*y, #bottom left
            8*(x+1), 8*y, #bottom right
            8*(x+1), 8*(y+1), #top right
            8*x, 8*(y+1), #top left
            close=False,
            fill=color,
            stroke="none",
        )
    )

x_count = 64
y_count = 27

count = 0
for a in range(x_count):
    for b in range(y_count):
        draw_pixel(img, a, b, smoke_colors[random.randrange(len(smoke_colors))])
    for b in range(random.randrange(4,17)):
        draw_pixel(img, a, b, colors[random.randrange(len(colors))])
    count+=1
    print(f"{round(100*count/512,2)}%")

img.savePng(f"website_assets/banner.png")