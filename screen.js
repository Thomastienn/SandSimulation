class Screen {
    constructor(pixels, num_pixel, pixel_l){
        this.pixels = pixels
        this.sand = []
        this.num_pixel = num_pixel
        this.pixel_l = pixel_l
    }
    loadScreen(){
        for(var i = 0; i < num_pixel; i++){
            var row = []
            for(var j = 0; j < this.num_pixel; j++){
                row.push(new Pixel(j*this.pixel_l, i*this.pixel_l, this.pixel_l, this.pixel_l, ctx, false, i*this.num_pixel + j))
            }
            screen.addPixel(row)
        }
    }

    draw(){
        this.loopScreen((pixel) => {
            pixel.draw()
        })
    }

    loopScreen(func){
        for(var i = 0; i < this.pixels.length; i++){
            for(var j = 0; j < this.pixels.length; j++){
                func(this.pixels[i][j])
            }
        }
    }

    addPixel(pixel){
        this.pixels.push(pixel)
    }

    findNearestPixel(x, y, dist=[]){
        this.loopScreen((pixel) => {
            dist.push({
                key: Math.sqrt(Math.pow((pixel.x_cen-x),2) + Math.pow(pixel.y_cen-y, 2)),
                value: pixel
            })
        })
        var min = Math.pow(10, 1000)
        var nearest_pixel = undefined

        for(var i = 0; i < dist.length; i++){
            var dis = dist[i].key
            if(dis < min){
                nearest_pixel = dist[i].value
                min = dis
            }
        }
        return nearest_pixel
    }

    fillPixel(pixels, fill=true){
        pixels.forEach(pixel => {
            pixel.setFill(fill)
            this.sand.push(pixel)
        });
    }

    checkCollision(below_x, pix_y){
        if(below_x >= this.num_pixel){
            return true
        }
        for(var i = 0; i < this.sand.length; i++){
            var s = this.sand[i]
            const sand_x = Math.floor(s.id / this.pixels.length)
            const sand_y = s.id % this.pixels.length
            if(sand_x == below_x && sand_y == pix_y){
                return true
            }
        }

        return false
    }

    // Return "L" is no sand on left, "R" is on right and "N" is none space
    checkCollisionSide(below_x, pix_y){
        for(var i = 0; i < this.sand.length; i++){
            var s = this.sand[i]
            const sand_x = Math.floor(s.id / this.pixels.length)
            const sand_y = s.id % this.pixels.length
            if(sand_x == below_x && sand_y == pix_y){
                const left_idx = pix_y-1
                const right_idx = pix_y+1
                if(left_idx < 0 || right_idx >= this.num_pixel){
                    return "N"
                }
                if(this.pixels[below_x][left_idx].fill == false){
                    return "L"
                }
                if(this.pixels[below_x][right_idx].fill == false){
                    return "R"
                }
            }
        }
        return "N"
    }

    addPhysics(){
        var new_sand = []
        this.sand.forEach(pixel => {
            const below_x = Math.floor(pixel.id / this.pixels.length) + 1
            const pix_y = pixel.id % this.pixels.length

            var is_moved = false
            if(this.checkCollision(below_x, pix_y)){
                const free_space = this.checkCollisionSide(below_x, pix_y)
                if(free_space == "L"){
                    pixel.setFill(false)
                    const below_pixel = this.pixels[below_x][pix_y-1]
                    new_sand.push(below_pixel)
                    below_pixel.setFill(true)

                    is_moved = true
                } 
                if(free_space == "R"){
                    pixel.setFill(false)
                    const below_pixel = this.pixels[below_x][pix_y+1]
                    new_sand.push(below_pixel)
                    below_pixel.setFill(true)

                    is_moved = true
                } 
                if(free_space == "N"){
                    new_sand.push(pixel)
                    return
                }
            }

            if(!is_moved){
                pixel.setFill(false)
                const below_pixel = this.pixels[below_x][pix_y]
                new_sand.push(below_pixel)
                below_pixel.setFill(true)
            }
        });
        this.sand = new_sand
    }
}