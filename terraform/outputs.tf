output "blue_ip" {
  value = "3.111.150.144"
}

output "green_ip" {
  value = "13.232.124.126"
}

output "alb_dns" {
  value = "devsecops-alb-532873523.ap-south-1.elb.amazonaws.com"
}

output "listener_arn" {
  value = aws_lb_listener.listener.arn
}

output "blue_tg_arn" {
  value = aws_lb_target_group.blue_tg.arn
}

output "green_tg_arn" {
  value = aws_lb_target_group.green_tg.arn
}