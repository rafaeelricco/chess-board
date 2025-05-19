"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">
          Unvoid Chess - Regras do Jogo
        </h1>

        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="mb-6">
              Voltar ao Jogo
            </Button>
          </Link>
        </div>

        <div className="mb-10 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Tabuleiro</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Dimensões customizáveis entre 6x6 e 12x12 quadrados</li>
            <li>Exemplos permitidos: 6x6, 6x8, 6x12, 12x12, 10x7</li>
            <li>Exemplos não permitidos: 13x6, 5x6</li>
          </ul>
        </div>

        <div className="mb-10 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">Peças</h2>

          <div className="mb-8 p-4 bg-gray-700 rounded-lg flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 relative">
              <Image
                src="/images/developer-white.png"
                alt="Developer"
                width={96}
                height={96}
                className="mx-auto"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Developer</h3>
              <p className="mb-2 font-semibold">Movimento:</p>
              <ul className="list-disc pl-6 mb-2">
                <li>Pode pular até 3 casas por turno</li>
                <li>
                  Pode se mover em qualquer direção (vertical, horizontal ou
                  diagonal)
                </li>
              </ul>
              <p className="mb-2 font-semibold">Captura:</p>
              <ul className="list-disc pl-6">
                <li>Captura outras peças movendo-se sobre elas</li>
                <li>Não pode pular para casas já ocupadas pela mesma cor</li>
                <li>
                  Não pode continuar o movimento após encontrar uma peça no
                  caminho
                </li>
              </ul>
            </div>
          </div>

          <div className="mb-8 p-4 bg-gray-700 rounded-lg flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 relative">
              <Image
                src="/images/designer-white.png"
                alt="Designer"
                width={96}
                height={96}
                className="mx-auto"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Designer</h3>
              <p className="mb-2 font-semibold">Movimento:</p>
              <ul className="list-disc pl-6 mb-2">
                <li>
                  Move-se em formato de "L" (similar ao cavalo no xadrez
                  tradicional)
                </li>
              </ul>
              <p className="mb-2 font-semibold">Captura:</p>
              <ul className="list-disc pl-6">
                <li>Captura outras peças movendo-se sobre elas</li>
                <li>Por mover-se em "L", pode pular sobre peças no caminho</li>
              </ul>
            </div>
          </div>

          <div className="mb-2 p-4 bg-gray-700 rounded-lg flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 relative">
              <Image
                src="/images/product-owner-white.png"
                alt="Product Owner"
                width={96}
                height={96}
                className="mx-auto"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">Product Owner</h3>
              <p className="mb-2 font-semibold">Movimento:</p>
              <ul className="list-disc pl-6 mb-2">
                <li>Move-se uma casa por turno</li>
                <li>
                  Pode se mover em qualquer direção (vertical, horizontal ou
                  diagonal)
                </li>
              </ul>
              <p className="mb-2 font-semibold">Captura:</p>
              <ul className="list-disc pl-6">
                <li>Captura outras peças movendo-se sobre elas</li>
                <li>
                  É a peça mais importante - se for capturada, o jogo termina
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mb-10 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Posição Inicial das Peças</h2>

          <div className="mb-6">
            <h3 className="text-xl font-bold mb-2">Peças Pretas</h3>
            <ul className="list-disc pl-6">
              <li>Product Owner: Canto superior direito</li>
              <li>Developer: À esquerda do Product Owner preto</li>
              <li>Designer: À esquerda do Developer preto</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-2">Peças Brancas</h3>
            <ul className="list-disc pl-6">
              <li>Product Owner: Canto inferior esquerdo</li>
              <li>Developer: À direita do Product Owner branco</li>
              <li>Designer: À direita do Developer branco</li>
            </ul>
          </div>
        </div>

        <div className="mb-10 p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Regras do Jogo</h2>
          <ul className="list-disc pl-6">
            <li>O primeiro turno é das peças brancas</li>
            <li>
              Para vencer, é necessário capturar o "Product Owner" adversário
            </li>
            <li>
              A captura acontece quando uma peça move-se para a casa ocupada por
              uma peça adversária
            </li>
            <li>
              Após um movimento, um destaque visual aparece na posição anterior
              e na nova posição da peça
            </li>
            <li>O destaque visual desaparece gradualmente em 3 segundos</li>
          </ul>
        </div>

        <div className="p-6 bg-gray-800 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">
            Como Capturar o Product Owner
          </h2>
          <p className="mb-4">
            Para vencer o jogo, você precisa capturar o Product Owner
            adversário. Isso pode ser feito de algumas maneiras:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Com o Developer:</strong> O Developer pode mover-se até 3
              casas em qualquer direção. Se o Product Owner adversário estiver
              dentro desse alcance e não houver peças no caminho, o Developer
              pode capturá-lo movendo-se sobre ele.
            </li>
            <li>
              <strong>Com o Designer:</strong> O Designer move-se em "L" (como
              um cavalo) e pode pular sobre peças no caminho. Se o Product Owner
              adversário estiver em uma posição alcançável pelo movimento em
              "L", o Designer pode capturá-lo.
            </li>
            <li>
              <strong>Com o seu próprio Product Owner:</strong> Embora seja uma
              estratégia arriscada, seu Product Owner também pode capturar o
              Product Owner adversário se estiver adjacente a ele.
            </li>
          </ul>
          <p>
            Lembre-se: proteger seu Product Owner é tão importante quanto tentar
            capturar o adversário. Desenvolva estratégias para manter seu
            Product Owner seguro enquanto busca oportunidades para capturar o
            Product Owner adversário.
          </p>
        </div>
      </div>
    </div>
  );
}
