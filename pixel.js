class Pixel {
    constructor(x, y, w, h, ctx, fill, id){
        this.w = w
        this.h = h
        this.x = x
        this.y = y
        this.ctx = ctx
        this.fill = fill
        this.x_cen = x+(w/2)
        this.y_cen = y+(h/2)
        this.id = id
    }

    draw(){
        if(!this.fill){
            this.ctx.strokeStyle = "black"
            this.ctx.strokeRect(this.x, this.y, this.w, this.h)
        } else{
            this.ctx.fillStyle = "red"
            this.ctx.fillRect(this.x, this.y, this.w, this.h)
        }
    }

    equal(pixel){
        return this.x == pixel.x && this.y == pixel.y
    }

    setFill(fill){
        this.fill = fill
    }
}