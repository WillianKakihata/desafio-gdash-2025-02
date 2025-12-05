import { Module } from "@nestjs/common";
import { CustomConfigModule } from "src/common/modules/custom.config.module";
import { OpenRouterService } from "./openrouter.service";

@Module({
  imports: [
    CustomConfigModule
  ],
  controllers: [],
  providers: [OpenRouterService],
  exports: [OpenRouterService],
})
export class OpenRouterModule {}