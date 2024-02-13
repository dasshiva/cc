#include <stdint.h>
#define export __attribute__((visibility("default")))

static int64_t regs[8];
static uint8_t *mem, size, kern_size;
static uint8_t *kernel;

export void set_mem_size(int __size) {
    size = __size;
}

export int32_t set_kernel(uint8_t* __kernel, int size) {
    kernel = __kernel;
    kern_size = size;
    if (kern_size > size) return -1;
    if (kernel[0] == 'A' && kernel[1] == 'B')
        return 0;
    return -1;
}

// to make the emulator faster no further checks are made on kernel format
// we assume the entire kernel.bin to contain valid code
// due to this assumption we have to heavily sandbox the code to ensure malicious agents are unable to execute any code they want
// most importantly this means no instructions are available that can modify the underlying environment in any way
// The emulated cpu has _ONLY_ four valid instructions
// LOAD, STORE, ADD, SUBTRACT - That's it. As the instruction set is tiny, the emulator code is not very big
// We also support some extra extensions which are used by assembler to optimise the produced code
export void run_kernel() {
    regs[7] = 2;
    while (regs[7] < size) {
        uint8_t ins = *((uint8_t*) regs[7]);
        uint8_t opcode, r1, r2;
        opcode = ins >> 6;
        r1 = (ins << 2) >> 5;
        r2 = (ins << 5) >> 5;
        switch (opcode) {
            case 0: regs[r1] += regs[r1] + regs[r2]; break; // ADD
            case 1: regs[r1] -= regs[r1] - regs[r2]; break; // SUBTRACT
            case 2: regs[r1] = *((uint32_t*) regs[r2]); break;  // LOAD
            case 3: *((uint32_t*) regs[r1]) = regs[r2]; break;  // STORE
        }
        regs[7]++;
    }
}